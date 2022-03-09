import { Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

/**
 * Validate user request before executing the function,
 * use this decorator only in the controller class
 *
 * @param type Validation DTO class
 * @param skipMissingProperties Skip missing validation properties, the default value is false, use true on 'PATCH' request,
 */
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

      let data: any = {}

      errors.forEach((error) => {
        data[error.property] = Object.values(error.constraints)[0]
      })

      res.status(400).send({ message: 'Invalid payload', data })
    }
  }
}
