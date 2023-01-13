import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import { List } from './list'
import { SearchPanel } from './search-panel'

export const ProductListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const debounceParam = useDebounce(param, 2000)
  const client = useHttp() // 封装好的请求方法

  // setParam(Object.assign({},param,{name:e.target.value}))
  useEffect(() => {
    client('projects', { data: cleanObject(debounceParam) }).then(setList)
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json())
    //   }
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam])
  // 加载一次，初始化
  useMount(() => {
    client('users', {}).then(setUsers)
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json())
    //   }
    // })
  })
  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
