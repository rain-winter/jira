import { User } from "./search-panel"

interface listProps{
  list:Project[],
  users:User[]
}
interface Project{
  id: string
  name:string 
  personId:string 
  pin:boolean 
  organization:string
}
export const List = ({ list, users }:listProps) => {
  return (
    <table>
      <thead>
        <tr>名称</tr>
        <tr>负责人</tr>
      </thead>
      <tbody>
        {list.map(project => (
          <tr key={project.id}>
            <td>{project.name}</td>
            {/* find找不到会出现undefined.name */}
            <td>
              {users.find(user => user.id === project.personId)?.name || '未知'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
