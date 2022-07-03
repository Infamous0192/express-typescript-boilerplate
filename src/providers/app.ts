import express from 'express'
import cors from 'cors'
import path from 'path'
import fileUpload from 'express-fileupload'

import { Database } from './database'
import socketIoHandler from './socket'
import { Controller } from './controller'
import errorMiddleware from 'middlewares/error'

class App {
  public app: express.Application

  constructor() {
    this.app = express()

    this.initializeMiddlewares()
    this.initializeDatabase()
    this.initializeControllers()
    this.initializeErrorHandling()
  }

  public listen() {
    let server = require('http').Server(this.app)
    let io = require('socket.io')(server, {
      cors: { origin: '*' },
    })

    socketIoHandler(io)

    server.listen(process.env.PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`)
    })
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: '*' }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.static('public'))
    this.app.use(fileUpload({ createParentPath: true }))
  }

  private initializeControllers() {
    Controller.init(this.app)
    this.app.all('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public', 'index.html'))
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  private initializeDatabase() {
    Database.init()
  }
}

export const app = new App()
