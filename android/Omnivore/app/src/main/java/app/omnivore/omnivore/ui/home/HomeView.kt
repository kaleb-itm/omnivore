package app.omnivore.omnivore.ui.home

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import app.omnivore.omnivore.Routes
import app.omnivore.omnivore.ui.reader.PDFDocumentView
import kotlinx.coroutines.flow.distinctUntilChanged


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeView(
  homeViewModel: HomeViewModel,
  navController: NavHostController
) {
  val selectedPDFItem: LinkedItem? by homeViewModel.selectedPDFItem.observeAsState(null)
  val searchText: String by homeViewModel.searchTextLiveData.observeAsState("")

  if (selectedPDFItem != null) {
    PDFDocumentView(urlString = selectedPDFItem!!.pageURLString)
  } else {
    Scaffold(
      topBar = {
        SearchBar(
          searchText = searchText,
          onSearchTextChanged = { homeViewModel.updateSearchText(it) },
          onSettingsIconClick = { navController.navigate(Routes.Settings.route) }
        )
      }
    ) { paddingValues ->
      HomeViewContent(
        homeViewModel,
        navController,
        modifier = Modifier
          .padding(
            top = paddingValues.calculateTopPadding(),
            bottom = paddingValues.calculateBottomPadding()
          )
      )
    }
  }
}

@Composable
fun HomeViewContent(
  homeViewModel: HomeViewModel,
  navController: NavHostController,
  modifier: Modifier
) {
  val listState = rememberLazyListState()
  val linkedItems: List<LinkedItem> by homeViewModel.itemsLiveData.observeAsState(listOf())

  LazyColumn(
    state = listState,
    verticalArrangement = Arrangement.Center,
    horizontalAlignment = Alignment.CenterHorizontally,
    modifier = modifier
      .background(MaterialTheme.colorScheme.background)
      .fillMaxSize()
      .padding(horizontal = 6.dp)
  ) {
    items(linkedItems) { item ->
      LinkedItemCard(
        item = item,
        onClickHandler = {
          if (item.isPDF()) {
            homeViewModel.selectedPDFItem.value = item
          } else {
            navController.navigate("WebReader/${item.slug}")
          }
        }

      )
    }
  }

  InfiniteListHandler(listState = listState) {
    homeViewModel.load()
  }
}

@Composable
fun InfiniteListHandler(
  listState: LazyListState,
  buffer: Int = 2,
  onLoadMore: () -> Unit
) {
  val loadMore = remember {
    derivedStateOf {
      val layoutInfo = listState.layoutInfo
      val totalItemsNumber = layoutInfo.totalItemsCount
      val lastVisibleItemIndex = (layoutInfo.visibleItemsInfo.lastOrNull()?.index ?: 0) + 1

      lastVisibleItemIndex > (totalItemsNumber - buffer)
    }
  }

  LaunchedEffect(loadMore) {
    snapshotFlow { loadMore.value }
      .distinctUntilChanged()
      .collect {
        onLoadMore()
      }
  }
}
