import { cleanEnv, port, str } from 'envalid'

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    MONGO_DB: str(),
    MONGO_HOST: str(),
    MONGO_USER: str(),
    MONGO_PASS: str(),
    JWT_SECRET: str(),
  })
}

export default validateEnv
