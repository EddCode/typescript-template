import winston, { Logger as WinstonLoggerType } from 'winston'
import {Logger} from '../domain/Logger'

export function WinstonLogger (): Logger {
  const logger: WinstonLoggerType = winston.createLogger({
    format: winston.format.combine(
      winston.format.prettyPrint(),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.colorize(),
      winston.format.simple()
    ),
    transports: [
      new winston.transports.Console()
    ]
  })

  function debug (message: string): void {
    logger.debug(message)
  }

  function error(message: string | Error): void {
    logger.error(message)
  }

  function info (message: string): void {
    logger.info(message)
  }

  function warn (message: string): void {
    logger.warn(message)
  }

  return {
    debug,
    error,
    info,
    warn
  }

}
