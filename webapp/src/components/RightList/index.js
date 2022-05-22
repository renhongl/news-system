import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal, notification, Popover, Switch } from 'antd';
import axios from 'axios'

import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal;

export default function Index() {

    const [data, setData] = useState([])

    const openNotification = (placement, message, title = '删除权限') => {
        notification.info({
            message: title,
            description: message,
            placement,
        });
    };

    const showDeleteConfirm = (item) => {
        confirm({
            title: '你确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteRight(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const deleteRight = (item) => {
        const { id, rightId } = item
        if (rightId) {
            deleteChild(rightId, id)
        } else {
            deleteParent(id)
        }
    }

    const deleteParent = (id) => {
        setData(data.filter(item => item.id !== id))
        axios.delete(`http://localhost:5000/rights/${id}`).then(result => {
            console.log(result.status)
            openNotification('bottomRight', result.status)
        })
    }

    const deleteChild = (rightId, id) => {
        let parent = data.find(item => item.id === rightId)
        if (parent) {
            parent.children = parent.children.filter(item => item.id !== id)
        }

        setData(data.map(item => {
            if (item.id === rightId) {
                return parent
            }
            return item
        }))
        axios.delete(`http://localhost:5000/children/${id}`).then(result => {
            console.log(result.status)
            openNotification('bottomRight', result.status)
        })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/rights?_embed=children').then(result => {
            const data = result.data
            data.forEach(item => {
                if (item.children && item.children.length === 0) {
                    item.children = undefined
                }
            })
            setData(data)
        })
    }, [])

    const onChange = (item) => {
        const { id, rightId } = item
        if (rightId) {
            changeChild(id, rightId)
        } else {
            changeParent(id)
        }
    }

    const changeChild = (id, rightId) => {
        let newPermission = 0
        const parent = data.find(item => item.id === rightId)
        if (parent) {
            parent.children = parent.children.map(item => {
                if (item.id !== id) {
                    return item
                } else {
                    let newItem = {...item}
                    newItem.pagepermission === 1 ? newItem.pagepermission = 0 : newItem.pagepermission = 1
                    newPermission = newItem.pagepermission
                    return newItem
                }
            })
            setData(data.map(item => {
                if (item.id !== rightId) {
                    return item
                }
                return parent
            }))
            axios.patch(`http://localhost:5000/children/${id}`, { pagepermission: newPermission }).then(result => {
                openNotification('bottomRight', result.status, '修改页面配置')
            })
        }
    }

    const changeParent = (id) => {
        let newPermission = 0
        setData(data.map(item => {
            if (item.id !== id) {
                return item
            } else {
                const newItem = { ...item }
                newItem.pagepermission === 1 ? newItem.pagepermission = 0 : newItem.pagepermission = 1
                newPermission = newItem.pagepermission
                return newItem
            }
        }))
        axios.patch(`http://localhost:5000/rights/${id}`, { pagepermission: newPermission }).then(result => {
            openNotification('bottomRight', result.status, '修改页面配置')
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <b>{text}</b>,
        },
        {
            title: '权限名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            key: 'key',
            render: (key) => {
                return <Tag color='orange'>{key}</Tag>
            }
        },
        {
            title: 'Action',
            render: (item) => (
                <div>
                    <Popover
                        title="页面配置项"
                        trigger={item.pagepermission === undefined ? '' : 'click'}
                        content={
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Switch checked={item.pagepermission === 1} onChange={() => { onChange(item) }} />
                            </div>
                        }>
                        <Button disabled={item.pagepermission === undefined} type="primary" shape="circle" icon={<EditOutlined />} /></Popover>
                    <Button onClick={() => showDeleteConfirm(item)} style={{ marginLeft: '10px' }} type="danger" shape="circle" icon={<DeleteOutlined />} />
                </div>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    )
}
