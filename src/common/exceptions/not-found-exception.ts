import { HttpException } from './http-exception'

export class NotFoundException extends HttpException {
  /**
   *
   * @extends {HttpException}
   * @param field field of the involved exception
   * @param id id of the involved exception
   */
  constructor(field: string, id: string) {
    super(404, `${field} with id ${id} is not found`)
  }
}
