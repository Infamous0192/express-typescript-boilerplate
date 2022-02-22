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

export const Get = (path: string = '/') => request(path, METHOD.GET)
export const Post = (path: string = '/') => request(path, METHOD.POST)
export const Put = (path: string = '/') => request(path, METHOD.PUT)
export const Delete = (path: string = '/') => request(path, METHOD.DELETE)
export const Patch = (path: string = '/') => request(path, METHOD.PATCH)
