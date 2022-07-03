import { METADATA_KEY } from 'constants/metadata'

/**
 * Define a controller, use this decorator on a class,
 * @param path API base path
 */
export function Controller(basePath: string = '/'): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(METADATA_KEY.BASE_PATH, basePath, target)
  }
}
