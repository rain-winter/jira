import { useEffect, useState } from 'react'

export const isFalsy = value => (value === 0 ? false : !value)

export const cleanObject = object => {
  console.log('object:' + object)
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    // 假设 value==0 也会删掉
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}
// hook 是要在组件、其他hook里运行
// use开头是hook 里面可以使用useEffect
export const useMount = callback => {
  useEffect(() => {
    callback()
  }, [])
}

// debounce 输入字，输完发一次请求
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    // 每次再value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    // 每次再上一个useEffect处理完后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}
