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
}

export default AuthController
