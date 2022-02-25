import mongoose, { Schema, Document } from 'mongoose'
import { Channel } from 'interfaces'

const channelSchema = new Schema(
  {
    name: String,
    publisher: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    slug: String,
    region: String,
  },
  { timestamps: true }
)

const channelModel = mongoose.model<Channel & Document>('Channel', channelSchema)

export default channelModel
