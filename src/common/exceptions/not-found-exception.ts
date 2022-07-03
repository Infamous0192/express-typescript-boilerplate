import { HttpException } from './http-exception'

export class NotFoundException extends HttpException {
  /**
   *
   * @extends {HttpException}
   * @param field field of the involved exception
   * @param id id of the involved exception
   * @param property default is 'id'
   * @return `${field} with ${property} ${id} is not found`
   */
  constructor(field: string, id: string, property: string = 'id') {
    super(404, `${field} with ${property} '${id}' is not found`)
  }
}
