import { Model } from './model'

export interface File extends Model {
  filename: string
  originalname: string
  path: string
  size: number
  type: string
}
