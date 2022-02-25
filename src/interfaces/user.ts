import { Role } from 'constants/role'

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface User {
  _id?: string
  name: string
  username: string
  password: string
  role: Role
  status: 'active' | 'inactive'
  createdAt?: Date
  updatedAt?: Date
}
