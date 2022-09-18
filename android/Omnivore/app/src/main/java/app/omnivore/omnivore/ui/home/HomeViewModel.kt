package app.omnivore.omnivore.ui.home

import androidx.core.net.toUri
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import app.omnivore.omnivore.Constants
import app.omnivore.omnivore.DatastoreKeys
import app.omnivore.omnivore.DatastoreRepository
import app.omnivore.omnivore.graphql.generated.SearchQuery
import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.api.Optional
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
  private val datastoreRepo: DatastoreRepository
): ViewModel() {
  private var cursor: String? = null
  private var items: List<LinkedItem> = listOf()
  private var searchedItems: List<LinkedItem> = listOf()

  // These are used to make sure we handle search result
  // responses in the right order
  private var searchIdx = 0
  private var receivedIdx = 0

  // Live Data
  val searchTextLiveData = MutableLiveData("")
  val itemsLiveData = MutableLiveData<List<LinkedItem>>(listOf())
  val selectedPDFItem = MutableLiveData<LinkedItem?>(null)

  private fun getAuthToken(): String? = runBlocking {
    datastoreRepo.getString(DatastoreKeys.omnivoreAuthToken)
  }

  fun updateSearchText(text: String) {
    searchTextLiveData.value = text

    if (text == "") {
      itemsLiveData.value = items
    } else {
      load(clearPreviousSearch = true)
    }
  }

  fun load(clearPreviousSearch: Boolean = false) {
    if (clearPreviousSearch) {
      cursor = null
    }

    viewModelScope.launch {
      val thisSearchIdx = searchIdx
      searchIdx += 1
      val authToken = getAuthToken()

      val apolloClient = ApolloClient.Builder()
        .serverUrl("${Constants.apiURL}/api/graphql")
        .addHttpHeader("Authorization", value = authToken ?: "")
        .build()

      val response = apolloClient.query(
        SearchQuery(
          after = Optional.presentIfNotNull(cursor),
          first = Optional.presentIfNotNull(15),
          query = Optional.presentIfNotNull(searchQuery())
        )
      ).execute()


      // Search results aren't guaranteed to return in order so this
      // will discard old results that are returned while a user is typing.
      // For example if a user types 'Canucks', often the search results
      // for 'C' are returned after 'Canucks' because it takes the backend
      // much longer to compute.
      if (thisSearchIdx in 1..receivedIdx) {
        return@launch
      }

      cursor = response.data?.search?.onSearchSuccess?.pageInfo?.endCursor
      receivedIdx = thisSearchIdx
      val itemList = response.data?.search?.onSearchSuccess?.edges ?: listOf()
      
      val newItems = itemList.map {
        LinkedItem(
          id = it.node.id,
          title = it.node.title,
          createdAt = it.node.createdAt,
          readAt = it.node.readAt,
          readingProgress = it.node.readingProgressPercent,
          readingProgressAnchor = it.node.readingProgressAnchorIndex,
          imageURLString = it.node.image,
          pageURLString = it.node.url,
          descriptionText = it.node.description,
          publisherURLString = it.node.originalArticleUrl,
          author = it.node.author,
          slug = it.node.slug,
          contentReader = it.node.contentReader.toString()
        )
      }

      if (searchTextLiveData.value != "") {
        val previousItems = if (clearPreviousSearch) listOf() else searchedItems
        searchedItems = previousItems.plus(newItems)
        itemsLiveData.value = searchedItems
      } else {
        items = items.plus(newItems)
        itemsLiveData.value = items
      }
    }
  }

  private fun searchQuery(): String {
      var query = "in:inbox sort:saved"

      if (searchTextLiveData.value != "") {
        query = query.plus(" ${searchTextLiveData.value}")
      }

      return query
  }
}

public data class LinkedItem(
  public val id: String,
  public val title: String,
  public val createdAt: Any,
//  public val savedAt: Any,
  public val readAt: Any?,
//  public val updatedAt: Any,
  public val readingProgress: Double,
  public val readingProgressAnchor: Int,
  public val imageURLString: String?,
//  public val onDeviceImageURLString: String?,
//  public val documentDirectoryPath: String?,
  public val pageURLString: String,
  public val descriptionText: String?,
  public val publisherURLString: String?,
//  public val siteName: String?,
  public val author: String?,
//  public val publishDate: Any?,
  public val slug: String,
//  public val isArchived: Boolean,
  public val contentReader: String?,
//  public val originalHtml: String?,
) {
  fun publisherDisplayName(): String? {
    return publisherURLString?.toUri()?.host
  }

  fun isPDF(): Boolean {
    val hasPDFSuffix = pageURLString.endsWith("pdf")
    return contentReader == "PDF" || hasPDFSuffix
  }
}
