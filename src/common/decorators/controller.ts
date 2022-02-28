/**
 * Define a controller, use this decorator on a class,
 * TODO make validation for path
 * @param path API base path
 */
export function Controller(path: string = '/'): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('path', path, target.prototype)
    let cb: Array<() => void> = Reflect.getMetadata('callback', target.prototype)
    if (cb) {
      cb.forEach((fn) => fn())
    }
    return target
  }
}
