import { Input } from 'antd'
import { useState } from 'react'
import { useAddKanban } from 'utils/kanban'
import { Container } from './kanban-column'
import { useProjectIdInUrl } from './util'
import React from 'react'

export const CreateKanban = () => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddKanban()

  const submit = async () => {
    let res = await addKanban({
      name,
      projectId,
    })
    console.log(res)

    setName('')
  }
  return (
    <Container>
      <Input
        placeholder="新建看板名称"
        onChange={(evt) => setName(evt.target.value)}
        onPressEnter={submit}
        value={name}
      />
    </Container>
  )
}
