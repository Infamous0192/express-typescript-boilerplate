import { NextFunction } from 'express'
import { METADATA_KEY } from 'constants/metadata'
import { MethodType, Request, Response } from 'interfaces'
import { extractParameters } from 'utils/metadata'

/**
 * This is a decorator factory for route
 * @param {MethodType} method http request method
 */
function decoratorFactory(method: MethodType) {
  return function (path: string, ...middleware: Function[]): MethodDecorator {
    return function (target, propertyKey, descriptor: PropertyDescriptor) {
      const response = async (req: Request, res: Response, next: NextFunction) => {
        const params = extractParameters(req, target, propertyKey)

        try {
          const respond = await descriptor.value(...params)
          let status = 200

          // if status not exist, then use default response status code
          if ('status' in respond) {
            status = respond.status
            delete respond['status']
          }

          res.status(status).json({ status: 'success', ...respond })
        } catch (error) {
          next(error)
        }
      }

      const routes = Reflect.getOwnMetadata(METADATA_KEY.ROUTES, target.constructor) || []

      Reflect.defineMetadata(
        METADATA_KEY.ROUTES,
        [...routes, { path, method, handler: [...middleware, response] }],
        target.constructor
      )
    }
  }
}

/**
 * GET request route
 * @param {string} path route path
 */
export const Get = decoratorFactory(MethodType.GET)

/**
 * GET request route
 * @param {string} path route path
 */
export const Post = decoratorFactory(MethodType.POST)

/**
 * GET request route
 * @param {string} path route path
 */
export const Put = decoratorFactory(MethodType.PUT)

/**
 * GET request route
 * @param {string} path route path
 */
export const Delete = decoratorFactory(MethodType.DELETE)

/**
 * GET request route
 * @param {string} path route path
 */
export const Patch = decoratorFactory(MethodType.PATCH)
