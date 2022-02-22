import dotenv from 'dotenv'
import 'reflect-metadata'
import validateEnv from 'utils/validate-env'
dotenv.config()
validateEnv()

import { app } from 'providers/app'

app.listen()
