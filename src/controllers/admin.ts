import { Controller, Get, HttpException } from 'common'
import { NextFunction, Request, Response } from 'express'

@Controller('/api')
class AdminController {
  @Get('/')
  public index(req: Request, res: Response, next: NextFunction) {
    return { test: 'Hello Worldssss!' }
  }

  @Get('/awe/:awe')
  public get(req: Request, res: Response) {
    return { anjai: req.params.awe }
  }
}

export default AdminController
