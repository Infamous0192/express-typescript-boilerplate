import { METADATA_KEY } from 'constants/metadata'
import controllers from 'controllers'
import { Route } from 'interfaces'
import { Application, Router } from 'express'

/**
 * Class provider for controller
 */
export class Controller {
  /**
   * Initialize controller
   * @param {Application} app express application
   */
  public static init(app: Application) {
    for (const controller of controllers) {
      const router = Router()

      const path = Reflect.getOwnMetadata(METADATA_KEY.BASE_PATH, controller)
      const routes: Route[] = Reflect.getOwnMetadata(METADATA_KEY.ROUTES, controller)
      routes.forEach(({ path, method, handler }) => {
        router[method](path, ...handler)
      })

      app.use(path, router)
    }
  }
}
