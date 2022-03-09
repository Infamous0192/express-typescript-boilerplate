import express from 'express'
import cors from 'cors'
import { Database } from './database'
import fileUpload from 'express-fileupload'
import path from 'path'

class App {
  public app: express.Application

  constructor() {
    this.app = express()

    this.initializeMiddlewares()
    this.initializeDatabase()
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
    this.app.use(fileUpload({ createParentPath: true }))
  }

  private initializeControllers() {
    this.app.all(/^\/(?!api($|\/.*))/, (req, res) => {
      res.sendFile(path.join(__dirname, '../../public', 'index.html'))
    })
    import('controllers')
  }

  private initializeDatabase() {
    Database.init()
  }
}

export const app = new App()
