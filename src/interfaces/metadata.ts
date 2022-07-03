/**
 * All possible Parameter decorator types
 *
 * @export
 * @enum {number}
 */
export enum ParameterType {
  REQUEST,
  RESPONSE,
  PARAMS,
  QUERY,
  BODY,
  HEADERS,
  COOKIES,
  NEXT,
  CREDS,
  FILES,
}

/**
 * Metadata parameter configuration
 *
 * @export
 * @interface ParameterConfig
 */
export interface ParameterConfig {
  index: number
  type: ParameterType
  name?: string
}

/**
 * All possible Method decorator types
 *
 * @export
 * @enum {string}
 */
export enum MethodType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

/**
 * Route config
 *
 * @export
 * @interface Route
 */
export interface Route {
  path: string
  method: MethodType
  handler: ((...args: any) => void)[]
}
