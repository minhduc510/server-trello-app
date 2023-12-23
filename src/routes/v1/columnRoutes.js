import express from 'express'

import { columnValition } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'

const Router = express.Router()

Router.route('/').post(
  columnValition.creatNew,
  columnController.creatNew
)

Router.route('/:id')
  .put(columnValition.update, columnController.update)
  .delete(
    columnValition.deleteItem,
    columnController.deleteItem
  )

export default Router
