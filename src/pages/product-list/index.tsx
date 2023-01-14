import styled from '@emotion/styled'
import {useState} from 'react'
import {useDebounce} from 'utils'
import {List} from './list'
import {SearchPanel} from './search-panel'
import {Typography} from "antd";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";

export const ProductListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: '',
    })

    const debounceParam = useDebounce(param, 1200)
    const {isLoading, error, data: list} = useProjects(debounceParam)
    const {data: users} = useUsers()

    //  第一种写法
    // setParam(Object.assign({},param,{name:e.target.value}))
    // const {run, isLoading, error, data: list} = useAsync<Project[]>()
    // useEffect(() => {
    //     run(client('projects', {data: cleanObject(debounceParam)}))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [debounceParam])

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam}/>
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
            <List loading={isLoading} users={users || []} dataSource={list || []}/>
        </Container>
    )
}

const Container = styled.div`
  padding: 3.2rem;
`
