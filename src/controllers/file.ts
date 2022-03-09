import { Controller, Delete, Get, HttpException, NotFoundException, Patch, Post } from 'common'
import { UploadedFile } from 'express-fileupload'
import { Request, Response } from 'interfaces'
import fileModel from 'models/file'
import FileService from 'services/file'

@Controller('/api/file')
class FileController {
  @Get()
  async index(req: Request, res: Response) {
    const file = await fileModel.find()

    return file
  }

  @Get('/:id')
  async get(req: Request, res: Response) {
    const { id } = req.params
    const file = await fileModel.findById(id)

    if (!file) throw new NotFoundException('File', id)

    return file
  }

  @Post()
  async create(req: Request, res: Response) {
    if (req.files == null || !req.files.file) throw new HttpException(400, 'File should not be empty')
    
    const file = req.files.file as UploadedFile

    const data = await FileService.upload(file)

    return { message: 'File uploaded successfully', data }
  }

  /**
   * TODO update file's metadata
   */
  @Patch('/:id')
  async update(req: Request, res: Response) {}

  /**
   * TODO delete file
   */
  @Delete('/:id')
  async delete(req: Request, res: Response) {}
}

export default FileController
