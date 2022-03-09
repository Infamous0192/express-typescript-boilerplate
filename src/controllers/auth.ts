import { Auth, Controller, Get, Post, Validation } from 'common'
import { Request, Response, User } from 'interfaces'
import LoginDto from 'validations/login'
import AuthService from 'services/auth'
import { Role } from 'constants/role'
import RegisterDto from 'validations/register'

@Controller('/api/auth')
class AuthController {
  @Validation(RegisterDto)
  @Post('/register')
  async register(req: Request, res: Response) {
    const data: User = req.body

    await AuthService.register({
      ...data,
      username: data.username.toLowerCase(),
      role: Role.CUSTOMER,
    })

    return { message: 'User create successfully' }
  }

  @Validation(LoginDto)
  @Post('/login')
  async login(req: Request, res: Response) {
    const data: LoginDto = req.body

    const user = await AuthService.login({ ...data, username: data.username.toLowerCase() })
    const token = AuthService.createToken(user)

    return { token }
  }
}

export default AuthController
