import { connect } from 'mongoose'
import { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_DB } from 'config'

export class Database {
  public static init() {
    const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`

    connect(uri)
      .then(() => {
        console.info('Successfully connected to Database')
      })
      .catch((error) => {
        console.error(`Error connecting to database :`, error)
      })
  }
}
