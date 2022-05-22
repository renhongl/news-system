import React from 'react'
import { Form, Modal, Input, Select } from 'antd'

const { Option } = Select;

export default function Index({ visible, onCreate, onCancel, regionList, roleList, current }) {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="添加用户"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                value={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                >
                    <Input value={current ? current.username : ''}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}
                >
                    <Input value={current ? current.password : ''}/>
                </Form.Item>

                <Form.Item
                    name="roleId"
                    label="角色"
                    rules={[
                        {
                            required: true,
                            message: '请输入角色!',
                        },
                    ]}
                >
                    <Select
                        placeholder=""
                        allowClear
                        value={current ? current.roleId : ''}
                    >
                        {
                            roleList.map(item => <Option key={item.id} value={item.id}>{item.roleName}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="region"
                    label="区域"
                    rules={[
                        {
                            required: true,
                            message: '请输入区域!',
                        },
                    ]}
                >
                    <Select
                        placeholder=""
                        allowClear
                        value={current ? current.region : ''}
                    >
                        {
                            regionList.map(item => <Option key={item.value} value={item.value}>{item.title}</Option>)
                        }
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    );
};