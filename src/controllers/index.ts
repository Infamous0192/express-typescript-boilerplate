import AuthController from './auth'
import FileController from './file'
import UserController from './user'

const controller = [new AuthController(), new FileController(), new UserController()]

export default controller
