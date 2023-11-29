import { type Router } from 'express'
import { glob } from 'glob'

export function registerRoutes (router: Router): void {
  const routes = glob.sync(`${__dirname}/**/*.route.*`)
  routes.forEach(route => { register(route, router) })
}

function register (routePath: string, app: Router): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const route = require(routePath)
  route.register(app)
}
