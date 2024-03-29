/* eslint-disable no-useless-catch */
import { cloneDeep } from 'lodash'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'
import { cardModel } from '~/models/cardModel'
import { boardModel } from '~/models/broadModel'
import { columnModel } from '~/models/columnModel'

const creatNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    const createdBoard = await boardModel.createNew(
      newBoard
    )
    return createdBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'Board not found!'
      )
    }
    const resBoard = cloneDeep(board)
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter((card) =>
        card.columnId.equals(column._id)
      )
    })
    delete resBoard.cards
    return resBoard
  } catch (error) {
    throw error
  }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updateBoard = await boardModel.update(
      boardId,
      updateData
    )
    return updateBoard
  } catch (error) {
    throw error
  }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updateAt: Date.now()
    })

    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updateAt: Date.now()
    })

    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return { updateResult: 'success' }
  } catch (error) {
    throw error
  }
}

export const boardService = {
  creatNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
