import { ObjectId } from 'mongoose'

export interface Channel {
  _id?: ObjectId
  name: string
  slug: string
  publisher: ObjectId
  region: string
  createdAt?: Date
  updatedAt?: Date
}
