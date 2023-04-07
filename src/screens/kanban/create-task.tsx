import { Card, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useAddTask } from 'utils/task'
import { useProjectIdInUrl } from './util'
import React from 'react'


export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('')
  const { mutateAsync: addTask } = useAddTask()
  const projectId = useProjectIdInUrl()
  const [inputMode, setInputMode] = useState(false)

  const submit = async () => {
    let res = await addTask({ projectId, name, kanbanId })
    console.log(res)

    setInputMode(false)
    setName('')
  }

  const toggle = () => setInputMode((mode) => !mode)

  useEffect(() => {
    if (!inputMode) setName('')
  }, [inputMode])

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>
  }

  return (
    <Card>
      <Input
        value={name}
        onBlur={toggle}
        placeholder="需要做些什么"
        autoFocus={true}
        onPressEnter={submit}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  )
}
