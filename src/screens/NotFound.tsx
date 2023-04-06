import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
// 404
const NotFound: React.FC = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => nav('/')} type="primary">
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound
