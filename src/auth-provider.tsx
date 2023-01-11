// 真实环境，使用firebase这种第三方auth服务，这个文件不需要开发
const localStorageKey = 'authprovidertoken'

export const getToken = () => window.localStorage.getItem(localStorageKey)
// export const handleUser
