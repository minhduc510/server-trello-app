import express from 'express'

import { cardValition } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'

const Router = express.Router()

Router.route('/').post(
  cardValition.creatNew,
  cardController.creatNew
)

export default Router
