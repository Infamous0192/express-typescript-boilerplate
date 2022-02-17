import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getController } from './controller'

class App {
  public app: express.Application

  constructor() {
    this.app = express()

    dotenv.config()
    this.initializeMiddlewares()
    this.initializeControllers()
  }

  public listen() {
    const server = require('http').Server(this.app)

    server.listen(process.env.PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`)
    })
  }

  private initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.static('public'))
  }

  private initializeControllers() {
    getController().then((controllers: any[]) => {
      controllers.forEach((controller) => new controller())
    })
  }
}

export const app = new App()
