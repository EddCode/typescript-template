import { type Express } from 'express'

import { StatusGetController } from '../controllers'

export const register = (app: Express): void => {
  const controller = StatusGetController()
  app.get('/status', controller.run)
}
