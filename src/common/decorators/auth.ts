import { Request, Response } from 'express'

export function Auth(key: string): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = function (...args: any[]) {
      const req = args[0] as Request
      const res = args[1] as Response

      const { authorization } = req.headers

      if (authorization) {
        const token = authorization.split(' ')[1]
        try {
          return original.apply(this, args)
        } catch (error) {
          res.status(403).json({ error: 'Not Authorized' })
        }
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    }
  }
}
