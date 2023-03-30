import { useUrlQueryParam } from 'utils/url'
import { useMemo } from 'react'
import { useProject } from 'utils/project'
import { useSearchParams } from 'react-router-dom'

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const
}

export const useProjectModal = () => {
  /**
   * 这段代码使用了React Hooks中的useUrlQueryParam自定义Hook，用于获取和设置URL参数。
具体来说，代码中的useUrlQueryParam()方法接收一个字符串数组参数["projectCreate"]，该数组表示要获取的URL参数名。该方法返回一个由两个元素构成的数组，第一个元素是当前URL参数的值，第二个元素是一个函数，用于设置该URL参数的值。
代码中使用数组解构语法将得到的数组解构成两个变量：projectCreate和setProjectCreate。projectCreate表示当前URL参数"projectCreate"的值，setProjectCreate表示设置该URL参数值的函数。
在代码中，我们可以通过调用setProjectCreate函数来更改URL参数"projectCreate"的值，从而实现更新URL参数的目的。
   */
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate',
  ])
  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setProjectCreate({ projectCreate: false })
  // return [projectCreate === 'true', open, close]
  return {
    close,
    open,
    projectModalOpen: projectCreate === 'true',
  }
}
