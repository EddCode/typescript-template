import { WinstonLogger } from '../contexts/shared/infrastructure/WinstonLogger'

import { Server } from './server'

function init (): void {
  try {
    const port: string = '3000'
    const server = Server(port)
    server.listen()
  } catch (err: unknown) {
    handleError(err)
  }
}

function handleError (err: unknown): void {
  WinstonLogger().error(err as Error)
  process.exit(1)
}

init()
