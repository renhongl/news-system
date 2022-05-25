import React, { useState, useEffect } from 'react'
import { Table, Button, Switch, notification, Modal } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../UserForm'
import { useSelector } from 'react-redux';
const { confirm } = Modal;


export default function Index() {

    const [userList, setUserList] = useState([])
    const [regionList, setRegionList] = useState([])
    const [roleList, setRoleList] = useState([])
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState(null)
    const { roleId, username, region } = useSelector(state => state.signin.token)

    const openNotification = (placement, message, title = '删除权限') => {
        notification.info({
            message: title,
            description: message,
            placement,
        });
    };

    const onCreate = (values, current) => {
        console.log('Received values of form: ', values);
        if (!!current) {
            axios.patch(`/users/${current.id}`, values).then(result => {
                openNotification('bottomRight', result.status, '修改用户')
                refreshUserList()
            })
        } else {
            const user = {
                ...values,
                id: Math.floor(Math.random() * 100000),
                default: false,
                roleState: true,
            }
            axios.post('/users', user).then(result => {
                openNotification('bottomRight', result.status, '添加用户')
                refreshUserList()
            })
        }
        setVisible(false);
    };

    useEffect(() => {
        refreshUserList()
    }, [])

    useEffect(() => {
        axios.get('/regions').then(result => {
            setRegionList(result.data)
        })
    }, [])

    useEffect(() => {
        axios.get('/roles').then(result => {
            setRoleList(result.data)
        })
    }, [])

    const deleteItem = (id) => {
        axios.delete(`/users/${id}`).then(result => {
            openNotification('bottomRight', result.status, '删除用户')
            refreshUserList()
        })
    }

    const refreshUserList = () => {
        axios.get('/users?_expand=role').then(result => {
            const data = result.data
            setUserList(roleId === 1001 ? data : [
                ...data.filter(item => item.username === username),
                ...data.filter(item => item.region === region && item.role.roleType === 3)
            ])
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
        axios.patch(`/users/${data.id}`, {
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
            okText: '是',
            okType: 'danger',
            cancelText: '否',
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
            filters: [{
                text: '全球',
                value: '',
            }, ...regionList.map(item => {
                return {
                    text: item.title,
                    value: item.value
                }
            })],
            onFilter: (value, item) => {
                return item.region === value
            },
            render: (region) => {
                return <b>{region ? region : '全球'}</b>
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
                    <Button onClick={() => { setVisible(true); setCurrent(item) }} disabled={item.default} type="primary" shape="circle" icon={<EditOutlined />} />
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
