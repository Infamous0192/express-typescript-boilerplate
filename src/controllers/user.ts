import { Controller, Body, Params, Query, Request } from 'common/decorators'
import { Delete, Get, Patch, Post } from 'common/decorators'
import { HttpException } from 'common/exceptions'

import { auth, validation } from 'middlewares'
import { Creds, QueryOption, User } from 'interfaces'

import AuthService from 'services/auth'
import UserDto from 'validations/user'
import UserService from 'services/user'
import { privilageLevel } from 'constants/role'

@Controller('/api/user')
class UserController {
  @Get('/', auth(2))
  async index(@Query() query: QueryOption) {
    const data = await UserService.findAll(query)

    return { data }
  }

  @Get('/:username', auth(2))
  async get(@Params('username') username: string) {
    const user = await UserService.findOne(username)

    return { data: { user } }
  }

  @Post('/', auth(2), validation(UserDto))
  async create(@Body() data: UserDto, @Request('creds') creds: Creds) {
    if (privilageLevel[data.role] > privilageLevel[creds.role])
      throw new HttpException(403, 'Access denied')

    await AuthService.register(data)

    return { message: 'User created successfully', status: 201 }
  }

  @Patch('/:username', auth(2), validation(UserDto, true))
  async update(
    @Params('username') username: string,
    @Body() data: User,
    @Request('creds') creds: Creds
  ) {
    if (privilageLevel[data.role] > privilageLevel[creds.role])
      throw new HttpException(403, 'Access denied')

    await UserService.update(username, data)

    return { message: 'User updated successfully' }
  }

  @Delete('/:username', auth(3))
  async delete(@Params('username') username: string) {
    await UserService.delete(username)

    return { message: 'User deleted successfully' }
  }
}

export default UserController
