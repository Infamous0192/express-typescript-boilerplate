import { Request, ParameterConfig, ParameterType } from 'interfaces'
import { METADATA_KEY } from 'constants/metadata'

export function extractParameters(req: Request, target: Object, propertyKey: string | symbol) {
  const params: ParameterConfig[] =
    Reflect.getOwnMetadata(METADATA_KEY.PARAMS, target, propertyKey) || []

  const args = []

  for (const { index, type, name } of params) {
    switch (type) {
      case ParameterType.REQUEST:
        args[index] = getParam(req, null, name)
        break
      case ParameterType.PARAMS:
        args[index] = getParam(req, 'params', name)
        break
      case ParameterType.QUERY:
        args[index] = getParam(req, 'query', name)
        break
      case ParameterType.BODY:
        args[index] = getParam(req, 'body', name)
        break
      case ParameterType.HEADERS:
        args[index] = getParam(req, 'headers', name)
        break
      case ParameterType.COOKIES:
        args[index] = getParam(req, 'cookies', name)
        break
      case ParameterType.CREDS:
        args[index] = getParam(req, 'creds', name)
        break
      case ParameterType.FILES:
        args[index] = getParam(req, 'files', name)
        break
    }
  }

  return args
}

function getParam(source: any, paramType: string, name: string) {
  const param = source[paramType] || source

  return name ? param[name] : param
}
