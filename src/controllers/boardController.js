import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const creatNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.creatNew(
      req.body
    )
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updateBoard = await boardService.update(
      boardId,
      req.body
    )
    res.status(StatusCodes.OK).json(updateBoard)
  } catch (error) {
    next(error)
  }
}

const moveCardToDifferentColumn = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await boardService.moveCardToDifferentColumn(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  creatNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
