// 编辑

import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { TaskTypeSelect } from 'components/task-type-select'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useEditTask } from 'utils/task'
import { useTasksModal } from './util'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

export const TaskModal = () => {
  const [form] = useForm()
  const { editingTask, editingTaskId, close } = useTasksModal()
  const { mutateAsync: editTask, isLoading: editingLoading } = useEditTask()

  const onCancel = () => {
    close()
    form.resetFields()
  }

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() })
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [form, editingTask])
  // TODO   forceRender={true}
  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText={'确认'}
      cancelText={'取消'}
      confirmLoading={editingLoading}
      title={'编辑任务'}
      open={!!editingTaskId}
    >
      <Form initialValues={editingTask} form={form} {...layout}>
        <Form.Item
          label={'任务名'}
          name={'name'}
          rules={[{ required: true, message: '请输入任务名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={'经办人'} name={'processorId'}>
          <UserSelect defaultOptionName={'经办人'} />
        </Form.Item>
        <Form.Item label={'类型'} name={'typeId'}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
    </Modal>
  )
}
