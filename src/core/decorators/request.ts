import { Request, Response } from 'express'
import { app as router } from 'providers/app'

export enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export function Get(path: string = '/'): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const response = async (req: Request, res: Response) => {
      try {
        const original = await descriptor.value(req, res)

        res.status(200).send(original)
      } catch (e) {
        res.status(500).json({
          message: 'Some error occurred',
          error: e.message,
          stack: e.stack,
        })
      }
    }
    let cb: Array<() => void> = Reflect.getMetadata('callback', target)
    if (!cb) {
      Reflect.defineMetadata('callback', (cb = []), target)
    }
    cb.push(() => {
      const base = Reflect.getMetadata('path', target)
      router.app[METHOD.GET](base + path, response)
    })
  }
}
