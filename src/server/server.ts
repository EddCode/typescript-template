import type * as http from 'http'

import { type Logger } from '@context/shared/domain/Logger'
import cors from 'cors'
import errorHandler from 'errorhandler'
import express, { type Request, type Response } from 'express'
import Router from 'express-promise-router'
import httpStatus from 'http-status'

import { WinstonLogger } from '../contexts/shared/infrastructure/WinstonLogger'

import { registerRoutes } from './routes'

interface ServerInterface {
  stop: () => Promise<void>
  listen: () => Promise<void>
  getHttpServer: () => http.Server
}

export function Server (port: string): ServerInterface {
  let httpServer: http.Server
  const logger: Logger = WinstonLogger()
  const expressApp: express.Express = express()
  const router = Router()

  router.use(cors())
  router.use(errorHandler())

  expressApp.use(express.json())
  expressApp.use(express.urlencoded({ extended: true }))
  expressApp.use(router)

  registerRoutes(router)

  router.use((err: Error, _req: Request, res: Response) => {
    logger.error(err.message)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
  })

  async function listen (): Promise<void> {
    await new Promise(resolve => {
      httpServer = expressApp.listen(port, () => {
        logger.info(`Server listening on port ${port} in ${expressApp.get('env')} mode`)
        logger.info('Press CTRL-C to stop\n')
        resolve(true)
      })
    })
  }

  function getHttpServer (): http.Server {
    return httpServer
  }

  async function stop (): Promise<void> {
    await new Promise((resolve, reject) => {
      httpServer.close((err?: Error) => {
        if (err) {
          reject(err)
          return
        }
        resolve(true)
      })
    })
  }

  return {
    stop,
    listen,
    getHttpServer
  }
}
