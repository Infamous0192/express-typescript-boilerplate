import { IsNotEmpty, MinLength } from 'class-validator'

/**
 * Inside the class is the properties that needs to be validated,
 * every field should use validation from 'class-validator' module,
 * the name of the class should use Dto suffix for consistency name
 */
class LoginDto {
  @IsNotEmpty() // The validation decorator
  public username: string

  // The validation while execute backwards from the property, see decorator rule https://www.typescriptlang.org/docs/handbook/decorators.html
  @MinLength(8)
  @IsNotEmpty({ message: 'custom message' }) // Customize validation option if needed
  public password: string
}

export default LoginDto
