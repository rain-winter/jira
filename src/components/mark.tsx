interface Props {
  name: string
  keyword: string
}
/**
 * 高亮name
 */
export const Mark = ({ name, keyword }: Props) => {
  //   console.log(name, keyword)

  if (!keyword) {
    return <>{name}</>
  }
  const arr = name.split(keyword)
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: '#257AFD' }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  )
}

// name '项目管理的项目'
// keyword '项目'
// 高亮项目
