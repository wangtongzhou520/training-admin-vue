/**
 * 存储数据
 */
export const setItem = (key: string, value: any): void => {
  // 将数组、对象类型的数据转化为 JSON 字符串进行存储
  let storageValue: string = value
  if (typeof value === 'object') {
    storageValue = JSON.stringify(value)
  }
  window.localStorage.setItem(key, storageValue)
}

/**
 * 获取数据
 */
export const getItem = (key: string): any => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data as string)
  } catch (err) {
    return data
  }
}

/**
 * 删除数据
 */
export const removeItem = (key: string): void => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = (): void => {
  window.localStorage.clear()
}
