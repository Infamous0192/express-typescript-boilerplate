export class HttpException extends Error {
  public status: number
  public message: string
  /**
   * Create HttpException
   * @param status Response status code
   * @param message Exception message
   * @example
   * throw new HttpException(404, 'exception message')
   */
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}
