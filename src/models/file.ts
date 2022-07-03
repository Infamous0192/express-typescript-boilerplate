import { Schema, model } from 'mongoose'
import { File } from 'interfaces'

const fileSchema = new Schema(
  {
    filename: String,
    originalname: String,
    path: String,
    size: Number,
    type: String,
  },
  { timestamps: true }
)

const fileModel = model<File>('File', fileSchema)

export default fileModel
