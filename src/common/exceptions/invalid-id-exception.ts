import { HttpException } from './http-exception'

/**
 * Used for invalid mongodb objectid
 */
export class InvalidObjectId extends HttpException {
  /**
   *
   * @extends {HttpException}
   * @param id id of the involved exception
   */
  constructor(id: string) {
    super(404, `'${id}' is not valid objectId`)
  }
}
