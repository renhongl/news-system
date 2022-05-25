import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, notification } from 'antd'
import axios from 'axios'
import { EditOutlined, DeleteOutlined, VerticalAlignTopOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { confirm } = Modal;

export default function Index() {
    const { username } = useSelector(state => state.signin.token)
    const [draftList, setDraftList] = useState([])
    const navigate = useNavigate()

    const openNotification = (placement, message, title = '删除权限') => {
        notification.info({
            message: title,
            description: message,
            placement,
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '文章标题',
            render: (item) => {
                return <a href={`#/mgmt/news-manage/preview/${item.id}`}>{item.title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '文章分类',
            dataIndex: 'category',
            render: (item) => {
                return item.title
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button
                        onClick={() => { navigate(`/mgmt/news-manage/update/${item.id}`) }}
                        type="basic"
                        shape="circle"
                        icon={<EditOutlined />}
                    />
                    <Button
                        onClick={() => showVerifyConfirm(item)}
                        style={{ marginLeft: '10px' }}
                        type="primary"
                        shape="circle"
                        icon={<VerticalAlignTopOutlined />}
                    />
                    <Button
                        onClick={() => showDeleteConfirm(item)}
                        style={{ marginLeft: '10px' }}
                        type="danger"
                        shape="circle" icon={<DeleteOutlined />}
                    />
                </div>
            }
        },
    ];

    const showVerifyConfirm = (item) => {
        confirm({
            title: '提交审核吗？',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                verifyItem(item.id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
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

    const verifyItem = (id) => {
        axios.patch(`/news/${id}`, {
            verifyState: 1
        }).then(result => {
            openNotification('bottomRight', result.status, '审核草稿')
            refreshDraft()
        })
    }

    const deleteItem = (id) => {
        axios.delete(`/news/${id}`).then(result => {
            openNotification('bottomRight', result.status, '删除草稿')
            refreshDraft()
        })
    }

    const refreshDraft = () => {
        axios.get(`/news?verifyState=0&_expand=category&author=${username}`).then(res => {
            setDraftList(res.data)
        })
    }

    useEffect(() => {
        refreshDraft()
    }, [])

    return (
        <Table dataSource={draftList} columns={columns} pagination={{ size: 5 }} rowKey={(item) => item.id} />
    )
}
