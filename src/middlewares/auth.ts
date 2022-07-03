import { NextFunction } from 'express'
import { HttpException } from 'common/exceptions'
import AuthService from 'services/auth'
import { privilageLevel } from 'constants/role'
import { Request, Response } from 'interfaces'

function authMiddleware(privilege: number = 0) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    try {
      if (!authorization) throw new HttpException(401, 'Unauthorized')

      const token = authorization.split(' ')[1]
      const creds = await AuthService.verifyToken(token)

      if (privilageLevel[creds.role] < privilege) throw new HttpException(403, 'Access denied')

      req.creds = creds
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default authMiddleware
