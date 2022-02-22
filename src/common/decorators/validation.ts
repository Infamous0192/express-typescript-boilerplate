import { Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

export function Validation(type: any, skipMissingProperties = false): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = async function (...args: any[]) {
      const req = args[0] as Request
      const res = args[1] as Response

      const errors: ValidationError[] = await validate(plainToInstance(type, req.body), {
        skipMissingProperties,
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
      })

      if (!errors.length) return original.apply(this, args)

      const message = errors.map((error) => Object.values(error.constraints)).join(', ')

      res.status(400).send({ message })
    }
  }
}
