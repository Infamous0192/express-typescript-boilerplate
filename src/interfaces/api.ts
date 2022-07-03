import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

export interface Creds {
  _id: string
  name: string
  username: string
  role: string
}

export interface Request extends ExpressRequest {
  creds: Creds
}

export interface Response extends ExpressResponse {}
