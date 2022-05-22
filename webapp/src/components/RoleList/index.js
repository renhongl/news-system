import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, notification, Tree } from 'antd'
import axios from 'axios'
import { UnorderedListOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal;

export default function Index() {

    const [roleList, setRoleList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [rightList, setRightList] = useState([])
    const [current, setCurrent] = useState(null)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        axios.patch(`http://localhost:5000/roles/${current.id}`, {
            rights: current.rights
        }).then(result => {
            openNotification('bottomRight', result.status)
            setRoleList(roleList.map(item => {
                if (item.id === current.id) {
                    return current
                }
                return item
            }))
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleUpdateRight = (item) => {
        setCurrent(item)
        showModal()
    }

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
                deleteItem(item.id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const deleteItem = (id) => {
        setRoleList(roleList.filter(item => item.id !== id))
        axios.delete(`http://localhost:5000/roles/${id}`).then(result => {
            console.log(result.status)
            openNotification('bottomRight', result.status)
        })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/roles').then(result => {
            setRoleList(result.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/rights?_embed=children').then(result => {
            setRightList(result.data)
        })
    }, [])

    

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button onClick={() => handleUpdateRight(item)} type="primary" shape="circle" icon={<UnorderedListOutlined />} />
                    <Button onClick={() => showDeleteConfirm(item)} style={{ marginLeft: '10px' }} type="danger" shape="circle" icon={<DeleteOutlined />} />
                </div>
            }
        }
    ]

    const onCheck = (e) => {
        const curr = {
            ...current,
            rights: e.checked
        }
        setCurrent(curr)
    }

    return (
        <section>
            <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    checkedKeys={current && current.rights}
                    onCheck={onCheck}
                    treeData={rightList}
                    checkStrictly={true}
                />
            </Modal>
            <Table dataSource={roleList} columns={columns} rowKey={(item) => item.id} pagination={{ pageSize: 5 }} />
        </section>
    )
}
