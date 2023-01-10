import * as qs from 'qs'
import { useEffect, useState } from 'react'
import { cleanObject } from 'util'
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

  // setParam(Object.assign({},param,{name:e.target.value}))
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async response => {
        if (response.ok) {
          setList(await response.json())
        }
      }
    )
  }, [param])

  useEffect(() => {
    console.log(apiUrl)

    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  )
}
