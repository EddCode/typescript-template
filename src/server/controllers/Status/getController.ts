import type { Request, Response } from 'express'
import httpStatus from 'http-status'

import { type Controller } from '../Controller'

export function StatusGetController (): Controller {
  return {
    run (_req: Request, res: Response) {
      res.status(httpStatus.OK).json({ status: httpStatus.OK })
    }
  }
}
