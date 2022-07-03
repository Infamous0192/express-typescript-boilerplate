import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { HttpException } from 'common/exceptions'
import { JWT_EXPIRES_IN, JWT_SECRET } from 'config'
import { User, Creds } from 'interfaces'

import LoginDto from 'validations/login'
import userModel from 'models/user'
import type UserDto from 'validations/user'

class AuthService {
  public static async register(data: UserDto) {
    if (!!(await userModel.findOne({ username: data.username })))
      throw new HttpException(400, 'User already exist')

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await userModel.create({
      ...data,
      password: hashedPassword,
    })

    return user
  }

  public static async login(loginData: LoginDto) {
    const { username, password } = loginData
    const user = await userModel.findOne({ username: username })

    if (!user) throw new HttpException(404, 'User not found')

    const validPass = await bcrypt.compare(password, user.password)

    if (!validPass) throw new HttpException(400, 'Password is not correct')

    return user
  }

  public static createToken(userid: string) {
    const options: jwt.SignOptions = { expiresIn: JWT_EXPIRES_IN }
    const token = jwt.sign({ userid }, JWT_SECRET, options)

    return token
  }

  public static async verifyToken(token: string): Promise<Creds> {
    try {
      const data: any = jwt.verify(token, process.env.JWT_SECRET)
      const user = await userModel.findById(data.userid)

      if (!user) throw new HttpException(401, 'Token expired or invalid')

      return { _id: user._id, name: user.name, role: user.role, username: user.username }
    } catch (error) {
      throw new HttpException(401, 'Token expired or invalid')
    }
  }
}

export default AuthService
