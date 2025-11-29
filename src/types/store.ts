// 用户相关类型
export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  userId: string
}

export interface UserInfo {
  menus: Menu[]
  [key: string]: any
}

// 菜单相关类型
export interface Menu {
  name: string
  path: string
  icon?: string
  children?: Menu[]
  component?: string
}

// 标签视图类型
export interface TagView {
  path: string
  name?: string
  title?: string
  [key: string]: any
}
