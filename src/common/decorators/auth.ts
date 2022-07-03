import { HttpException } from 'common/exceptions'
import { privilageLevel } from 'constants/role'
import { Request, Response } from 'interfaces'
import AuthService from 'services/auth'

/**
 * Secure API Routes using JWT, use this decorator in the Controller Class only.
 * @param privilege Role privilege level, user with higher level can access privilege from the lower level
 */
export function Auth(privilege: number = 0): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = async function (...args: any[]) {
      const req = args[0] as Request
      const res = args[1] as Response

      const { authorization } = req.headers

      try {
        if (!authorization) throw new HttpException(401, 'Unauthorized')

        const token = authorization.split(' ')[1]
        const creds = await AuthService.verifyToken(token)

        if (privilageLevel[creds.role] < privilege) throw new HttpException(403, 'Access denied')

        req.creds = creds

        return original.apply(this.args)
      } catch (error) {
        const status = error.status || 500
        const message = error.message || 'Something went wrong'
        res.status(status).send({ status: 'error', data: null, message })
      }
    }
  }
}
