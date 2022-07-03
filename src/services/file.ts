import fs from 'fs'
import { isValidObjectId } from 'mongoose'
import { InvalidObjectId, NotFoundException } from 'common/exceptions'
import { UploadedFile } from 'express-fileupload'

import { File, QueryOption } from 'interfaces'
import fileModel from 'models/file'
import { sanitizeQuery, searchQuery } from 'utils/pagination'

class FileService {
  public static async findAll() {
    const file = await fileModel.find().select('-__v')

    return file
  }

  public static async paginate(option: QueryOption) {
    const { limit, page, keyword, sort } = sanitizeQuery(option)
    const search = searchQuery(keyword, 'originalname')
    const file = await fileModel
      .find(search)
      .skip(limit * (page - 1))
      .limit(limit)
      .sort(sort)
      .select('-__v')

    const total = await fileModel.countDocuments()
    const metadata = {
      page,
      limit,
      total,
      count: file.length,
      hasPrev: page > 1,
      hasNext: page < Math.ceil(total / limit),
    }

    return { file, metadata }
  }

  public static async findOne(id: string): Promise<File> {
    if (!isValidObjectId(id)) throw new InvalidObjectId(id)

    const file = await fileModel.findById(id)

    if (!file) throw new NotFoundException('File', id)

    return file
  }

  public static async upload(file: UploadedFile): Promise<File> {
    const filename = `${Date.now()}_${file.name}`
    const path = `public/files/${filename}`

    file.mv(path)

    const data = await fileModel.create({
      filename,
      originalname: file.name,
      path: `/files/${filename}`,
      size: file.size,
      type: file.mimetype,
    })

    return data
  }

  public static async delete(id: string): Promise<File> {
    const file = await fileModel.findByIdAndDelete(id)

    if (!file) throw new NotFoundException('File', id)

    const filepath = `public/${file.path}`

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }

    return file
  }

  public static async summary() {
    const data = await fileModel.find().select('size type')

    const files = data.map(({ size, type }) => ({ size, type: type.split('/')[0] }))
    const images = files.filter(({ type }) => type == 'image')
    const videos = files.filter(({ type }) => type == 'video')

    const count: any = {}
    count['total'] = files.length
    count['image'] = images.length
    count['video'] = videos.length
    count['other'] = files.length - images.length - videos.length

    const size: any = {}
    size['total'] = files.reduce((total, { size }) => total + size, 0)
    size['image'] = images.reduce((total, { size }) => total + size, 0)
    size['video'] = videos.reduce((total, { size }) => total + size, 0)
    size['other'] = size['total'] - size['image'] - size['video']

    return { count, size }
  }
}

export default FileService
