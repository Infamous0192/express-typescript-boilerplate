import glob from 'glob'
import path from 'path'

export class Controller {
  /**
   * Get all controller class in the controller directory
   * @returns Controller classes
   */
  static getController(): Promise<any> {
    const dirname = path.dirname(__dirname)

    return new Promise((resolve, reject) => {
      glob(`${dirname}/controllers/*.ts`, function (err, res) {
        if (err) {
          reject(err)
        } else {
          Promise.all(
            res.map((file) => {
              return import(file.replace(dirname, '.').replace('.ts', ''))
            })
          ).then((modules) => {
            resolve(modules.map((module) => module.default))
          })
        }
      })
    })
  }
}
