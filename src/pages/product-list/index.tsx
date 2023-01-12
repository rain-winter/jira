import * as qs from 'qs'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils'
import { List } from './list'
import { SearchPanel } from './search-panel'

const apiUrl = process.env.REACT_APP_API_URL

export const ProductListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const debounceParam = useDebounce(param, 2000)
  console.log('debounceParam+' + debounceParam)

  // setParam(Object.assign({},param,{name:e.target.value}))
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debounceParam])
  // 加载一次，初始化
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })
  return (
    <div>
      produceListr
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  )
}
