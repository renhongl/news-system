import React, { useState, useEffect } from 'react'
import { Table, Button, Switch, notification, Modal } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../UserForm'

const { confirm } = Modal;


export default function Index() {

    const [userList, setUserList] = useState([])
    const [regionList, setRegionList] = useState([])
    const [roleList, setRoleList] = useState([])
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState(null)

    const openNotification = (placement, message, title = '删除权限') => {
        notification.info({
            message: title,
            description: message,
            placement,
        });
    };

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        const user = {
            ...values,
            id: Math.floor(Math.random() * 100000),
            default: false,
            roleState: true,
        }
        axios.post('http://localhost:5000/users', user).then(result => {
            openNotification('bottomRight', result.status, '添加用户')
            refreshUserList()
        })
        setVisible(false);
    };

    useEffect(() => {
        refreshUserList()
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/regions').then(result => {
            setRegionList(result.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/roles').then(result => {
            setRoleList(result.data)
        })
    }, [])

    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/users/${id}`).then(result => {
            openNotification('bottomRight', result.status, '删除用户')
            refreshUserList()
        })
    }

    const refreshUserList = () => {
        axios.get('http://localhost:5000/users?_expand=role').then(result => {
            setUserList(result.data)
        })
    }

    const updateRoleState = (data) => {
        setUserList(userList.map(item => {
            if (item.id === data.id) {
                return {
                    ...item,
                    roleState: !item.roleState
                }
            }
            return item
        }))
        axios.patch(`http://localhost:5000/users/${data.id}`, {
            roleState: !data.roleState
        }).then(result => {
            openNotification('bottomRight', result.status, '更新用户')
        })
    }

    const showDeleteConfirm = (item) => {
        confirm({
            title: '你确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteItem(item.id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (region) => {
                return region ? region : '全球'
            }
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return role.roleName
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch onChange={() => { updateRoleState(item) }} disabled={item.default} checked={roleState}></Switch>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button onClick={() => {setVisible(true); setCurrent(item)}} disabled={item.default} type="primary" shape="circle" icon={<EditOutlined />} />
                    <Button onClick={() => showDeleteConfirm(item)} disabled={item.default} style={{ marginLeft: '10px' }} type="danger" shape="circle" icon={<DeleteOutlined />} />
                </div>
            }
        }
    ]

    return (
        <section>
            <Button onClick={() => {
                setCurrent(null);
                setVisible(true);
            }} style={{ marginBottom: '20px' }} type='primary'>添加</Button>
            <Table dataSource={userList} columns={columns} rowKey={(item) => item.id} pagination={{ pageSize: 5 }} />
            <UserForm
                regionList={regionList}
                roleList={roleList}
                visible={visible}
                current={current}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </section>
    )
}
