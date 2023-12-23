import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'
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
    description: Joi.string()
      .min(3)
      .max(256)
      .trim()
      .strict()
      .required(),
    type: Joi.string()
      .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
      .required()
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false
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

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string()
      .min(3)
      .max(256)
      .trim()
      .strict(),
    type: Joi.string().valid(
      BOARD_TYPES.PUBLIC,
      BOARD_TYPES.PRIVATE
    ),
    columnOrderIds: Joi.array().items(
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

const moveCardToDifferentColumn = async (
  req,
  res,
  next
) => {
  const correctCondition = Joi.object({
    currentCardId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required(),
    prevColumnId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required(),
    prevCardOrderIds: Joi.array()
      .required()
      .items(
        Joi.string()
          .pattern(OBJECT_ID_RULE)
          .message(OBJECT_ID_RULE_MESSAGE)
      ),
    nextColumnId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required(),
    nextCardOrderIds: Joi.array()
      .required()
      .items(
        Joi.string()
          .pattern(OBJECT_ID_RULE)
          .message(OBJECT_ID_RULE_MESSAGE)
      )
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false
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

export const boardValition = {
  creatNew,
  update,
  moveCardToDifferentColumn
}
