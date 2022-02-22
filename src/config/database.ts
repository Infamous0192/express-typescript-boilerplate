export const MONGO_DB = process.env.MONGO_USER
export const MONGO_HOST = process.env.MONGO_HOST
export const MONGO_USER = process.env.MONGO_USER
export const MONGO_PASS = process.env.MONGO_PASS
export const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`
