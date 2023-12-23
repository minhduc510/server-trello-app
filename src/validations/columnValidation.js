import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'
import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE
} from '~/utils/validators'

const creatNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string()
      .min(3)
      .max(50)
      .trim()
      .strict()
      .required(),
    boardId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required()
  })

  try {
    await correctCondition.validateAsync(
      {
        ...req.body
      },
      {
        abortEarly: false
      }
    )
    next()
  } catch (error) {
    const errorMesage = new Error(error).message
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMesage
    )
    next(customError)
  }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    boardId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    cardOrderIds: Joi.array().items(
      Joi.string()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE)
    )
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    const errorMesage = new Error(error).message
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMesage
    )
    next(customError)
  }
}

const deleteItem = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required()
  })

  try {
    await correctCondition.validateAsync(req.params)
    next()
  } catch (error) {
    const errorMesage = new Error(error).message
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMesage
    )
    next(customError)
  }
}

export const columnValition = {
  creatNew,
  update,
  deleteItem
}
