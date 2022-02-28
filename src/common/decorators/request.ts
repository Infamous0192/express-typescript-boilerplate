import { Request, Response } from 'express'
import { app as router } from 'providers/app'

export enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

const STATUS_CODE = {
  get: 200,
  post: 201,
  put: 200,
  delete: 200,
  patch: 200,
}

/**
 * Make a http request in the controller, this function is only a wrapper, use basic decorator request instead.
 * TODO create validation for the path
 * @param path Request path
 * @param method Request method
 */
export function request(path: string, method: METHOD): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const response = async (req: Request, res: Response) => {
      try {
        const original = await descriptor.value(req, res)

        res.status(STATUS_CODE[method]).json(original)
      } catch (error) {
        const status = error.status || 500
        const message = error.message || 'Something went wrong'
        res.status(status).send({ message })
      }
    }

    let cb: Array<() => void> = Reflect.getMetadata('callback', target)
    if (!cb) Reflect.defineMetadata('callback', (cb = []), target)
    cb.push(() => {
      const base = Reflect.getMetadata('path', target)
      router.app[method](base + path, response)
    })
  }
}

/**
 * Create GET Request, use this in the controller class
 * @param path Request path, the path will use controller's path as base path
 */
export const Get = (path: string = '/') => request(path, METHOD.GET)

/**
 * Create POST Request, use this in the controller class
 * @param path Request path, the path will use controller's path as base path
 */
export const Post = (path: string = '/') => request(path, METHOD.POST)

/**
 * Create PUT Request, use this in the controller class
 * @param path Request path, the path will use controller's path as base path
 */
export const Put = (path: string = '/:id') => request(path, METHOD.PUT)

/**
 * Create DElETE Request, use this in the controller class
 * @param path Request path, the path will use controller's path as base path
 */
export const Delete = (path: string = '/:id') => request(path, METHOD.DELETE)

/**
 * Create PATCH Request, use this in the controller class
 * @param path Request path, the path will use controller's path as base path
 */
export const Patch = (path: string = '/:id') => request(path, METHOD.PATCH)
