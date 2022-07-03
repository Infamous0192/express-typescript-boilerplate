import { Controller, Post, Body, Request, Get } from 'common/decorators'

import { auth, validation } from 'middlewares'

import { Creds, User } from 'interfaces'
import { Role } from 'constants/role'

import AuthService from 'services/auth'
import LoginDto from 'validations/login'
import RegisterDto from 'validations/register'

@Controller('/api/auth')
class AuthController {
  @Post('/register', validation(RegisterDto))
  async register(@Body() data: User) {
    await AuthService.register({
      ...data,
      role: Role.CUSTOMER,
    })

    return { message: 'User create successfully' }
  }

  @Post('/login', validation(LoginDto))
  async login(@Body() data: LoginDto) {
    const { _id, username, name, role } = await AuthService.login(data)
    const token = AuthService.createToken(_id)

    return { data: { token, creds: { _id, username, name, role } } }
  }

  @Get('/verify', auth())
  async verify(@Request('creds') creds: Creds) {
    return { data: { creds } }
  }

  @Get('/refresh', auth())
  async refreshToken(@Request('creds') creds: Creds) {
    const token = AuthService.createToken(creds._id)

    return { data: { token } }
  }
}

export default AuthController
