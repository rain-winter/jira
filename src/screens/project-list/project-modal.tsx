import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useAddProject, useEditProject } from 'utils/project'
import { useProjectModal } from './util'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal()

  const [form] = useForm()
  const title = editingProject ? '编辑项目' : '创建项目'
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject()

  const onFinish = async (values: any) => {
    await mutateAsync({ ...editingProject, ...values })
    close()
  }

  const closeModal = () => {
    form.resetFields()
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return (
    <Drawer onClose={closeModal} open={projectModalOpen}>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>{title}</h1>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: '请输入项目名称' }]}
            >
              <Input placeholder="请输入项目名称" />
            </Form.Item>
            <Form.Item
              label="部门"
              name="organization"
              rules={[{ required: true, message: '请输入部门名称' }]}
            >
              <Input placeholder="请输入部门名称" />
            </Form.Item>
            <Form.Item label="负责人" name="personId">
              <UserSelect defaultOptionName="负责人" />
            </Form.Item>
            <Form.Item>
              <Button loading={mutateLoading} type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  )
}
