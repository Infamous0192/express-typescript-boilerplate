import { IsEnum, IsNotEmpty, MinLength } from 'class-validator'
import { Role } from 'constants/role'

class UserDto {
  @IsNotEmpty()
  public name: string

  @IsNotEmpty()
  public username: string

  @MinLength(8)
  @IsNotEmpty()
  public password: string

  @IsEnum(Role, { message: 'role is not valid' })
  @IsNotEmpty()
  public role: Role
}

export default UserDto
