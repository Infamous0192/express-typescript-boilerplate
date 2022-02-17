import glob from 'glob'
import path from 'path'

export function getController(): Promise<any> {
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
          // console.log(modules)
          resolve(modules.map((module) => module.default))
        })
      }
    })
  })
}
