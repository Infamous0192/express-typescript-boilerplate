import { UploadedFile } from 'express-fileupload'
import { Controller, Delete, Get, Patch, Post, Params, Request, Query } from 'common/decorators'
import { HttpException, NotFoundException } from 'common/exceptions'

import { auth } from 'middlewares'
import FileService from 'services/file'

import { QueryOption } from 'interfaces'

@Controller('/api/file')
class FileController {
  @Get('/', auth(3))
  async index(@Query() query: QueryOption) {
    const data = await FileService.paginate(query)

    return { data }
  }

  @Get('/summary', auth(1))
  async getSummary() {
    const data = await FileService.summary()

    return { data }
  }

  @Get('/:id', auth(1))
  async get(@Params('id') id: string) {
    const file = await FileService.findOne(id)

    return { data: { file } }
  }

  @Post('/', auth(2))
  async create(@Request('files') files: { [key: string]: UploadedFile }) {
    if (!files) throw new HttpException(400, 'File should not be empty')

    const data = await FileService.upload(files.file)

    return { message: 'File uploaded successfully', data }
  }

  @Patch('/:id')
  async update() {
    return {}
  }

  @Delete('/:id')
  async delete(@Params('id') id: string) {
    const file = await FileService.delete(id)

    return { message: 'File deleted successfully' }
  }
}

export default FileController
