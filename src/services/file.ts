import { HttpException } from 'common'
import { UploadedFile } from 'express-fileupload'
import fileModel from 'models/file'

class FileService {
  public static async upload(file: UploadedFile) {
    const filename = `${Date.now()}_${file.name}`
    const path = `public/files/${filename}`

    file.mv(path, (err) => {})

    const data = await fileModel.create({
      filename,
      originalname: file.name,
      path: `/files/${filename}`,
      size: file.size,
      type: file.mimetype,
    })

    return data
  }
}

export default FileService
