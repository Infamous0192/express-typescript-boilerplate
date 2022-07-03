import { QueryOption } from 'interfaces'

/**
 * This function is used to process keyword to valid mongoose query
 * @param keyword search keyword
 * @param field search field
 */
export function searchQuery(keyword: string, field: string) {
  if (!keyword) return {}

  const query = field.split(' ').map((i) => {
    return { [i]: new RegExp(keyword, 'i') }
  })

  return {
    $or: query,
  }
}

/**
 * Sanitize query option to valid format, and assign default option
 * @param {QueryOption} option query option
 * @returns pagination
 */
export function sanitizeQuery(option: QueryOption) {
  const limit = parseInt(option.limit as string) || 5
  const page = parseInt(option.page as string) || 1
  const sort = option.sort || '-createdAt'
  const keyword = option.keyword || ''

  return { limit, page, sort, keyword }
}

export function filterQuery(field: string, query: { [key: string]: string }) {
  const filter: { [key: string]: string } = {}

  field
    .trim()
    .split(' ')
    .forEach((item) => {
      if (query[item]) filter[item] = query[item]
    })

  return filter
}
