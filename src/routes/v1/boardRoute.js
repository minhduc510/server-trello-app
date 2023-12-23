import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { boardValition } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: 'GET: APIs get list boards.' })
  })
  .post(boardValition.creatNew, boardController.creatNew)

Router.route('/:id')
  .get(boardController.getDetails)
  .put(boardValition.update, boardController.update)

Router.route('/supports/moving_card').put(
  boardValition.moveCardToDifferentColumn,
  boardController.moveCardToDifferentColumn
)

export default Router
