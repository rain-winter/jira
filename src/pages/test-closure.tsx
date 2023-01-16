import { useEffect, useState } from 'react'
import { useMount } from 'utils'

const test = () => {
  let num = 0
  const effect = () => {
    num += 1
    const message = `现在的num值：${num}`
    return function unmount() {
      console.log(message)
    }
  }
  return effect
}

const add = test()
const unmount = add()
// 每一次调用 message都会被重新创建 并加1
add()
add()
unmount() // 1

export const Test = () => {
  const [num, setNum] = useState(0)

  const add = () => setNum(num + 1)

  /**
   * 页面加载后还是打印 0 ，即使调用add()
   * react hook 与闭包，hook 闭包经典的坑
   */
  useMount(() => {
    let id = setInterval(() => {
      console.log('num is setInterval', num)
    }, 1000)
    return () => clearInterval(id)
  })
  useEffect(() => {
    return () => {
      // 页面卸载打印 0
      console.log(num)
    }
  }, [num]) // 加上依赖项就可以了
  return (
    <div>
      <button onClick={add}>add</button>
      <p>number:{num}</p>
    </div>
  )
}
