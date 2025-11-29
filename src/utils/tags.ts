const whiteList: string[] = ['/login', '/import', '/404', '/401', '/500']

/**
 * path 是否需要被缓存
 * @param path - 路径
 * @returns 是否需要缓存
 */
export function isTags(path: string): boolean {
  return !whiteList.includes(path)
}
