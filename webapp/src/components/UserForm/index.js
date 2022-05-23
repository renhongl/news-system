import React, { useState, useEffect, useCallback } from 'react'
import { Form, Modal, Input, Select } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function Index({ visible, onCreate, onCancel, regionList, roleList, current }) {
    const [form] = Form.useForm()
    const [isGlobal, setIsGlobal] = useState(false)
    const { roleId, region } = JSON.parse(localStorage.getItem('token'))

    const checkRegion = useCallback((item) => {
        if (roleId === 1001 ) {
            return false
        } else {
            return item.value !== region
        }
    })

    const checkRole = useCallback((item) => {
        if (roleId === 1001 ) {
            return false
        } else {
            return item.roleType !== 3
        }
    })

    const onChangeRole = useCallback(() => {
        if (form.getFieldsValue().roleId === 1001) {
            setIsGlobal(true)
            form.setFieldsValue({
                region: ''
            })
        } else {
            setIsGlobal(false)
        }
    }, [form])

    useEffect(() => {
        if (current) {
            form.setFieldsValue(current)
            onChangeRole()
        }
    }, [current, form, onChangeRole])

    return (
        <Modal
            visible={visible}
            title={current ? "修改用户" : "添加用户"}
            okText="保存"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values, current);
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
                    <Input />
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
                    <Input />
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
                        onChange={() => {
                            onChangeRole()
                        }}

                    >
                        {
                            roleList.map(item => <Option disabled={checkRole(item)} key={item.id} value={item.id}>{item.roleName}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="region"
                    label="区域"
                    rules={[
                        {
                            required: !isGlobal,
                            message: '请输入区域!',
                        },
                    ]}
                >
                    <Select
                        placeholder=""
                        disabled={isGlobal}
                        allowClear

                    >
                        {
                            regionList.map(item => <Option disabled={checkRegion(item)} key={item.value} value={item.value}>{item.title}</Option>)
                        }
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    );
};