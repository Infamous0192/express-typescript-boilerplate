import mongoose, { Schema, Document } from 'mongoose'
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

const fileModel = mongoose.model<File & Document>('File', fileSchema)

export default fileModel
