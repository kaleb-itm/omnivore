package app.omnivore.omnivore.dataService

import app.omnivore.omnivore.graphql.generated.type.CreateHighlightInput
import app.omnivore.omnivore.graphql.generated.type.HighlightType
import app.omnivore.omnivore.models.ServerSyncStatus
import app.omnivore.omnivore.networking.*
import app.omnivore.omnivore.persistence.entities.Highlight
import app.omnivore.omnivore.persistence.entities.SavedItemAndHighlightCrossRef
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.util.*

suspend fun DataService.createWebHighlight(jsonString: String, colorName: String?) {
  val createHighlightInput = Gson().fromJson(jsonString, CreateHighlightParams::class.java).asCreateHighlightInput()

  withContext(Dispatchers.IO) {
    val highlight = Highlight(
      type = "HIGHLIGHT",
      highlightId = createHighlightInput.id,
      shortId = createHighlightInput.shortId,
      quote = createHighlightInput.quote.getOrNull(),
      prefix = null,
      suffix = null,
      patch = createHighlightInput.patch.getOrNull(),
      annotation = createHighlightInput.annotation.getOrNull(),
      createdAt = null,
      updatedAt = null,
      createdByMe = false,
      color = colorName ?: createHighlightInput.color.getOrNull(),
      highlightPositionPercent = createHighlightInput.highlightPositionPercent.getOrNull() ?: 0.0,
      highlightPositionAnchorIndex = createHighlightInput.highlightPositionAnchorIndex.getOrNull() ?: 0
    )

    highlight.serverSyncStatus = ServerSyncStatus.NEEDS_CREATION.rawValue

    val crossRef = SavedItemAndHighlightCrossRef(
      highlightId = createHighlightInput.id,
      savedItemId = createHighlightInput.articleId
    )

    db.highlightDao().insertAll(listOf(highlight))
    db.savedItemAndHighlightCrossRefDao().insertAll(listOf(crossRef))

    val newHighlight = networker.createHighlight(createHighlightInput)

    newHighlight?.let {
      db.highlightDao().update(it)
    }
  }
}

suspend fun DataService.createNoteHighlight(savedItemId: String, note: String): String {
  val shortId = NanoId.generate(size=14)
  val createHighlightId = UUID.randomUUID().toString()

  withContext(Dispatchers.IO) {
    val highlight = Highlight(
      type = "NOTE",
      highlightId = createHighlightId,
      shortId = shortId,
      quote = null,
      prefix = null,
      suffix = null,
      patch =null,
      annotation = note,
      createdAt = null,
      updatedAt = null,
      createdByMe = true,
      color = null,
      highlightPositionAnchorIndex = 0,
      highlightPositionPercent = 0.0
    )

    highlight.serverSyncStatus = ServerSyncStatus.NEEDS_CREATION.rawValue

    val crossRef = SavedItemAndHighlightCrossRef(
      highlightId = createHighlightId,
      savedItemId = savedItemId
    )

    db.highlightDao().insertAll(listOf(highlight))
    db.savedItemAndHighlightCrossRefDao().insertAll(listOf(crossRef))

    val newHighlight = networker.createHighlight(input = CreateHighlightParams(
      type = HighlightType.NOTE,
      articleId = savedItemId,
      id = createHighlightId,
      shortId = shortId,
      quote = null,
      patch = null,
      annotation = note,
      highlightPositionAnchorIndex = 0,
      highlightPositionPercent = 0.0
    ).asCreateHighlightInput())

    newHighlight?.let {
      db.highlightDao().update(it)
    }
  }

  return createHighlightId
}

suspend fun DataService.mergeWebHighlights(jsonString: String) {
  val mergeHighlightInput = Gson().fromJson(jsonString, MergeHighlightsParams::class.java).asMergeHighlightInput()

  withContext(Dispatchers.IO) {
    val highlight = db.highlightDao().findById(highlightId = mergeHighlightInput.id) ?: return@withContext
    highlight.shortId = mergeHighlightInput.shortId
    highlight.quote = mergeHighlightInput.quote
    highlight.patch = mergeHighlightInput.patch
    highlight.prefix = mergeHighlightInput.prefix.getOrNull()
    highlight.annotation = mergeHighlightInput.annotation.getOrNull()
    highlight.serverSyncStatus = ServerSyncStatus.NEEDS_UPDATE.rawValue

    for (highlightID in mergeHighlightInput.overlapHighlightIdList) {
      deleteHighlight(highlightID)
    }

    val crossRef = SavedItemAndHighlightCrossRef(
      highlightId = mergeHighlightInput.id,
      savedItemId = mergeHighlightInput.articleId
    )

    db.savedItemAndHighlightCrossRefDao().insertAll(listOf(crossRef))
    db.highlightDao().update(highlight)

    val isUpdatedOnServer = networker.mergeHighlights(mergeHighlightInput)

    if (isUpdatedOnServer) {
      highlight.serverSyncStatus = ServerSyncStatus.IS_SYNCED.rawValue
      db.highlightDao().update(highlight)
    }
  }
}

suspend fun DataService.updateWebHighlight(jsonString: String) {
  val updateHighlightParams = Gson().fromJson(jsonString, UpdateHighlightParams::class.java).asUpdateHighlightInput()

  withContext(Dispatchers.IO) {
    val highlight = db.highlightDao().findById(highlightId = updateHighlightParams.highlightId) ?: return@withContext

    highlight.annotation = updateHighlightParams.annotation.getOrNull()
    highlight.serverSyncStatus = ServerSyncStatus.NEEDS_UPDATE.rawValue
    db.highlightDao().update(highlight)

    val isUpdatedOnServer = networker.updateHighlight(updateHighlightParams)

    if (isUpdatedOnServer) {
      highlight.serverSyncStatus = ServerSyncStatus.IS_SYNCED.rawValue
      db.highlightDao().update(highlight)
    }
  }
}

suspend fun DataService.deleteHighlights(jsonString: String) {
  val highlightIDs = Gson().fromJson(jsonString, DeleteHighlightParams::class.java).asIdList()

  for (highlightID in highlightIDs) {
    deleteHighlight(highlightID)
  }
}

private suspend fun DataService.deleteHighlight(highlightID: String) {
  withContext(Dispatchers.IO) {
    val highlight = db.highlightDao().findById(highlightId = highlightID) ?: return@withContext
    highlight.serverSyncStatus = ServerSyncStatus.NEEDS_DELETION.rawValue
    db.highlightDao().update(highlight)

    val isUpdatedOnServer = networker.deleteHighlights(listOf(highlightID))

    if (isUpdatedOnServer) {
      db.highlightDao().deleteById(highlightId = highlightID)
    }
  }
}
