import { Schema, model } from 'mongoose'
import { User } from 'interfaces'
import { Role } from 'constants/role'

const userSchema = new Schema(
  {
    name: String,
    username: String,
    password: String,
    role: {
      type: String,
      enum: Role,
      default: Role.CUSTOMER,
    },
  },
  { timestamps: true }
)

const userModel = model<User & Document>('User', userSchema)

export default userModel
