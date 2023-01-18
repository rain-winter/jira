import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * 返回 页面url中指定的键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam, setSearchParam] = useSearchParams()
  return [
    // 这里是无限渲染的bug，他每次都次都会创建新对象
    // 每次组件都会渲染新的值，为避免这个情况，我们使用useMeno
    // TODO 只有searchParam变化才会变化
    // TODO useState会比对新旧对象是否变化
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          // key加中括号表示key是一个变量
          return { ...prev, [key]: searchParam.get(key) || '' }
        }, {} as { [key in K]: string }),
      //keys是数组，加进来会无限循环
      //只有当keys是useState([])声明式加进来才有意义 useState不会无限渲染
      [searchParam,keys]
    ),
    setSearchParam,
  ] as const
}

// const a = ['jack', 12, { gender: 'male' }] as const
// 防止诡异类型推断
