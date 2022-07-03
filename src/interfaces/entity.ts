import { Role } from 'constants/role'

export interface Model {
  _id?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface User extends Model {
  name: string
  username: string
  password: string
  role: Role
  status?: 'active' | 'inactive'
}

export interface File extends Model {
  filename: string
  originalname: string
  path: string
  size: number
  type: string
}
