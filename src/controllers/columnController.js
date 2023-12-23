import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const creatNew = async (req, res, next) => {
  try {
    const createdColumn = await columnService.creatNew(
      req.body
    )
    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const column = await columnService.getDetails(columnId)
    res.status(StatusCodes.OK).json(column)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const updateColumn = await columnService.update(
      columnId,
      req.body
    )
    res.status(StatusCodes.OK).json(updateColumn)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const result = await columnService.deleteItem(columnId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  creatNew,
  getDetails,
  update,
  deleteItem
}
