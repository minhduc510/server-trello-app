import express from 'express'
import { StatusCodes } from 'http-status-codes'

import boardRoutes from '~/routes/v1/boardRoute'
import cardRoutes from '~/routes/v1/cardRoutes'
import columnRoutes from '~/routes/v1/columnRoutes'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: 'APIs V1 are ready to use.' })
})

Router.use('/boards', boardRoutes)
Router.use('/columns', columnRoutes)
Router.use('/cards', cardRoutes)

export default Router
