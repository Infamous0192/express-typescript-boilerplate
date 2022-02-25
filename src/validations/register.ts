import { IsNotEmpty, MinLength } from 'class-validator'

class RegisterDto {
  @IsNotEmpty()
  public name: string

  @IsNotEmpty()
  public username: string

  @MinLength(8)
  @IsNotEmpty()
  public password: string
}

export default RegisterDto
