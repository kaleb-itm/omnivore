/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { LibraryItem, LibraryItemState } from '../../entity/library_item'
import { readPushSubscription } from '../../pubsub'
import { authTrx } from '../../repository'
import { libraryItemRepository } from '../../repository/library_item'
import { updateLibraryItem } from '../../services/library_item'
import {
  findUploadFileById,
  setFileUploadComplete,
} from '../../services/upload_file'
import { logger } from '../../utils/logger'

interface UpdateContentMessage {
  fileId: string
  content: string
  title?: string
  author?: string
  description?: string
}

export function contentServiceRouter() {
  const router = express.Router()

  router.post('/search', async (req, res) => {
    logger.info('search req', req)
    const { message: msgStr, expired } = readPushSubscription(req)
    logger.info('read pubsub message', { msgStr, expired })

    if (!msgStr) {
      res.status(200).send('Bad Request')
      return
    }

    if (expired) {
      logger.info('discarding expired message')
      res.status(200).send('Expired')
      return
    }

    const data = JSON.parse(msgStr)
    if (!('fileId' in data) || !('content' in data)) {
      logger.info('No file id or content found in message')
      res.status(200).send('Bad Request')
      return
    }
    const msg = data as UpdateContentMessage

    // First attempt to parse the file id out of the name
    const parts = msg.fileId.split('/')
    const fileId = parts && parts.length > 1 ? parts[1] : undefined
    if (!fileId) {
      logger.info('No file id found in message')
      res.status(200).send('Bad Request')
      return
    }

    const uploadFile = await findUploadFileById(fileId)
    if (!uploadFile) {
      logger.info('No file found')
      res.status(404).send('No file found')
      return
    }

    const libraryItem = await authTrx(
      async (tx) =>
        tx
          .withRepository(libraryItemRepository)
          .createQueryBuilder('item')
          .innerJoinAndSelect('item.uploadFile', 'file')
          .where('item.user = :userId', { userId: uploadFile.user.id })
          .andWhere('file.id = :fileId', { fileId })
          .getOne(),
      undefined,
      uploadFile.user.id
    )
    if (!libraryItem) {
      logger.info(`No upload file found for id: ${fileId}`)
      res.status(404).send('Bad Request')
      return
    }

    const itemToUpdate: QueryDeepPartialEntity<LibraryItem> = {
      originalContent: msg.content,
    }
    if (msg.title) itemToUpdate.title = msg.title
    if (msg.author) itemToUpdate.author = msg.author
    if (msg.description) itemToUpdate.description = msg.description

    // This event is fired after the file is fully uploaded,
    // so along with updating content, we mark it as
    // succeeded.
    itemToUpdate.state = LibraryItemState.Succeeded

    try {
      const uploadFileData = await setFileUploadComplete(
        fileId,
        uploadFile.user.id
      )
      logger.info('updated uploadFileData', uploadFileData)
    } catch (error) {
      logger.info('error marking file upload as completed', error)
    }

    const result = await updateLibraryItem(
      libraryItem.id,
      itemToUpdate,
      uploadFile.user.id
    )
    logger.info('Updating library item text', {
      id: libraryItem.id,
      result,
      content: msg.content.substring(0, 20),
    })

    res.status(200).send(msg)
  })

  return router
}
