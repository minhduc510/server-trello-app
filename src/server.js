/* eslint-disable no-console */
import cors from 'cors'
import express from 'express'
import exitHook from 'async-exit-hook'

import route_v1 from '~/routes/v1'

import { env } from '~/config/environment'
import { corsOptions } from './config/cors'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use('/v1', route_v1)
  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    console.log(
      `Hello MinhDuc, I am running at http://${hostname}:${port}`
    )
  })

  exitHook(() => {
    console.log('Exit app!!!')
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => {
    console.log('Connected to MongoDB Cloud Atlas!')
  })
  .then(() => START_SERVER())
  .catch((error) => {
    console.error(error)
    process.exit(0)
  })
