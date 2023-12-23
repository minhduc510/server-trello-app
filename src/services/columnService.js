/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'
import { cardModel } from '~/models/cardModel'
import { boardModel } from '~/models/broadModel'
import { columnModel } from '~/models/columnModel'

const creatNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(
      newColumn
    )
    const getNewColumn = await columnModel.findOneById(
      createdColumn.insertedId
    )
    if (getNewColumn) {
      getNewColumn.cards = []
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    return getNewColumn
  } catch (error) {
    throw error
  }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updateColumn = await columnModel.update(
      columnId,
      updateData
    )
    return updateColumn
  } catch (error) {
    throw error
  }
}

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(
      columnId
    )
    if (!targetColumn) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'Column not found!'
      )
    }
    await columnModel.deleteOneById(columnId)
    await cardModel.deleteManyByColumnId(columnId)
    await boardModel.pullColumnOrderIds(targetColumn)
    return {
      deleteResult:
        'Column add its Cards deleted successfully!'
    }
  } catch (error) {
    throw error
  }
}

export const columnService = {
  creatNew,
  update,
  deleteItem
}
