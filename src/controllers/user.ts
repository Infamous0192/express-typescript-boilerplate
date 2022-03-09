import { Controller, Delete, Get, HttpException, Patch, Post, Validation } from 'common'
import { Request, Response, User } from 'interfaces'
import userModel from 'models/user'
import AuthService from 'services/auth'
import UserDto from 'validations/user'

@Controller('/api/user')
class UserController {
  @Get()
  async get(req: Request, res: Response) {
    const user = await userModel.find().select('-password')

    return user
  }

  @Get('/:id')
  async getByUsername(req: Request, res: Response) {
    const username = req.params.id

    const user = await userModel.findOne({ username })

    if (!user) throw new HttpException(404, 'User not found')

    return user
  }

  @Validation(UserDto)
  @Post()
  async create(req: Request, res: Response) {
    const data: UserDto = req.body

    const user = await AuthService.register(data)

    return { message: 'User created successfully' }
  }

  @Validation(UserDto, true)
  @Patch()
  async update(req: Request, res: Response) {
    const username = req.params.id

    const user = await userModel.findByIdAndUpdate({ username }, req.body)

    if (!user) throw new HttpException(404, 'User not found')

    return { message: 'User updated successfully' }
  }

  @Delete()
  async delete(req: Request, res: Response) {}
}

export default UserController
