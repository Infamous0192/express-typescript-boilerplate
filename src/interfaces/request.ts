import { Request as ExpressRequest } from 'express'
import { Creds } from './creds'

export interface Request extends ExpressRequest {
  creds: Creds
}
