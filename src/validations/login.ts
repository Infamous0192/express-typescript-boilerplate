import { IsNotEmpty, MinLength } from 'class-validator'

class LoginDto {
  @IsNotEmpty()
  public username: string

  @MinLength(8)
  @IsNotEmpty()
  public password: string
}

export default LoginDto
