import { Button, Drawer, DrawerProps, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { useProjectIdInUrl } from 'screens/kanban/util'
import { useAddEpic } from 'utils/epic'

export const CreateEpic = (
  props: Pick<DrawerProps, 'open'> & { onClose: () => void }
) => {
  const { mutate: addTask, isLoading, isError } = useAddEpic()
  const [form] = useForm()
  const projectId = useProjectIdInUrl()
  const onFinish = async (values: any) => {
    await addTask({ ...values, projectId })
    props.onClose()
  }

  useEffect(() => {
    form.resetFields()
  }, [form, props.open])

  return (
    <Drawer
      forceRender={true}
      open={props.open}
      onClose={props.onClose}
      destroyOnClose={true}
      width={'30%'}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>创建任务组</h1>
          <Form
            form={form}
            layout={'vertical'}
            style={{ width: '40rem' }}
            onFinish={onFinish}
          >
            <Form.Item
              label={'名称'}
              name={'name'}
              rules={[{ required: true, message: '请输入任务组名' }]}
            >
              <Input placeholder={'请输入任务组名称'} />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right' }}>
              <Button loading={isLoading} type={'primary'} htmlType={'submit'}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  )
}
