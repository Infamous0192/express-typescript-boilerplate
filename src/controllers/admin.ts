import { Controller, Get } from 'core'
import { Request, Response } from 'express'

@Controller('/api')
class AdminController {
  @Get('/')
  public index(req: Request, res: Response) {
    return { test: 'Hello Worldssss!' }
  }

  @Get('/awe/:awe')
  public get(req: Request, res: Response) {
    return { anjai: req.params.awe }
  }
}

export default AdminController
