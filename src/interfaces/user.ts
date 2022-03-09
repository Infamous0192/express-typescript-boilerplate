import { Role } from 'constants/role'
import { Model } from './model'

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface User extends Model {
  name: string
  username: string
  password: string
  role: Role
  status: 'active' | 'inactive'
}
