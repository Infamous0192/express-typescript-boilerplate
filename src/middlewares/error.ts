import { NextFunction, Request, Response } from 'express'
import { HttpException } from 'common/exceptions'

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  res.status(status).send({ status: 'fail', message })
}

export default errorMiddleware
