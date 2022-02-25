import mongoose, { Schema, Document } from 'mongoose'
import { User, UserStatus } from 'interfaces'
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
    status: {
      type: String,
      enum: UserStatus,
      default: UserStatus.INACTIVE,
    },
  },
  { timestamps: true }
)

const userModel = mongoose.model<User & Document>('Channel', userSchema)

export default userModel
