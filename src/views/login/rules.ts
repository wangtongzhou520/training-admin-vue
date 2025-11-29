export const validatePassword = () => {
  return (_rule: any, value: any, callback: any) => {
    if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback()
    }
  }
}
