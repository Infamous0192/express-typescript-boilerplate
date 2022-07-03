import { QueryOption, User } from 'interfaces'
import bcrypt from 'bcryptjs'

import { NotFoundException } from 'common/exceptions'
import userModel from 'models/user'
import { searchQuery, sanitizeQuery } from 'utils/pagination'

class UserService {
  public static async findAll(option: QueryOption) {
    const { limit, page, keyword, sort } = sanitizeQuery(option)
    const search = searchQuery(keyword, 'name username role')

    const user = await userModel
      .find(search)
      .skip(limit * (page - 1))
      .limit(limit)
      .sort(sort)
      .select('-password -__v')
    const total = await userModel.countDocuments(search)

    const metadata = {
      page,
      limit,
      total,
      count: user.length,
      hasPrev: page > 1,
      hasNext: page < Math.ceil(total / limit),
    }

    return { user, metadata }
  }

  public static async findOne(username: string): Promise<User> {
    const user = await userModel.findOne({ username }).select('-password -__v')

    if (!user) throw new NotFoundException('User', username, 'username')

    return user
  }

  public static async update(username: string, data: User): Promise<User> {
    if (data['password']) data['password'] = await bcrypt.hash(data.password, 10)

    const user = await userModel.findOneAndUpdate({ username }, data)

    if (!user) throw new NotFoundException('User', username, 'username')

    return user
  }

  public static async delete(username: string): Promise<User> {
    const user = await userModel.findOneAndRemove({ username })

    if (!user) throw new NotFoundException('User', username, 'username')

    return user
  }
}

export default UserService
