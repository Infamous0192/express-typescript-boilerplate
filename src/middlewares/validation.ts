import { RequestHandler } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

function validationMiddleware(type: any, skipMissingProperties = false): RequestHandler {
  return async (req, res, next) => {
    const errors: ValidationError[] = await validate(plainToInstance(type, req.body), {
      skipMissingProperties,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    })

    if (!errors.length) return next()

    let data: any = {}

    errors.forEach((error) => {
      data[error.property] = Object.values(error.constraints)[0]
    })

    res.status(400).send({ status: 'fail', message: 'Invalid payload', data })
  }
}

export default validationMiddleware
