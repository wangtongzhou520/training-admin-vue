import type { App } from 'vue'
import dayjs from 'dayjs'

const dateFilter = (val: string | number | Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  let dateValue: string | number | Date = val
  if (!isNaN(Number(val))) {
    dateValue = parseInt(val.toString())
  }

  return dayjs(dateValue).format(format)
}

export default (app: App): void => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
