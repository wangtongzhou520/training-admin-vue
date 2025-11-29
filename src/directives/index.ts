import type { App } from 'vue'
import permission from './permission'

export default (app: App): void => {
  app.directive('permission', permission)
}
