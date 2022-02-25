import { HttpException } from './http-exception'

export class NotFoundException extends HttpException {
  constructor(field: string, id: string) {
    super(404, `${field} with id ${id} is not found`)
  }
}
