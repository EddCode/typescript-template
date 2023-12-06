import { WinstonLogger } from '../contexts/shared/infrastructure/WinstonLogger'

import { Server } from './server'

async function init (): Promise<void> {
  try {
    const port: string = '3000'
    const server = Server(port)
    await server.listen()
  } catch (err: unknown) {
    handleError(err)
  }
}

function handleError (err: unknown): void {
  WinstonLogger().error(err as Error)
  process.exit(1)
}

init().catch(_ => _)
