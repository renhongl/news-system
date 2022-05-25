import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, notification, Tag } from 'antd'
import axios from 'axios'
import { EditOutlined, DeleteOutlined, DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
const { confirm } = Modal;

export default function Index() {
    const { username } = useSelector(state => state.signin.token)
    const [draftList, setDraftList] = useState([])
    const stateList = ['', '审核中', '已通过', '未通过']
    const colorState = ['', 'orange', 'green', 'red', 'blue']
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
            title: '审核状态',
            render: (item) => {
                return <Tag color={colorState[item.verifyState] }>{stateList[item.verifyState]}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    {item.verifyState === 1 && <Button onClick={() => showVerifyConfirm(item)} style={{ marginLeft: '10px' }} type="danger" >撤销</Button>}
                    {item.verifyState === 2 && <Button onClick={() => showPublishConfim(item)} style={{ marginLeft: '10px' }} type="success" >发布</Button>}
                    {item.verifyState === 3 && <Button onClick={() => showUpdateConfirm(item)} style={{ marginLeft: '10px' }} type="primary" >修改</Button>}
                </div>
            }
        },
    ];

    const showPublishConfim = (item) => {
        confirm({
            title: '确定发布吗？',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                axios.patch(`/news/${item.id}`, {
                    publishState: 2,
                    publishTime: Date.now()
                }).then(result => {
                    openNotification('bottomRight', result.status, '发布文章')
                    refreshDraft()
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const showUpdateConfirm = (item) => {
        confirm({
            title: '重新修改吗？',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                navigate(`/mgmt/news-manage/update/${item.id}`, {replace: true})
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const showVerifyConfirm = (item) => {
        confirm({
            title: '撤销审核吗？',
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

    const verifyItem = (id) =>{
        axios.patch(`/news/${id}`, {
            verifyState: 0
        }).then(result => {
            openNotification('bottomRight', result.status, '撤销审核')
            refreshDraft()
        })
    }

    const deleteItem = (id) => {
        axios.delete(`/news/${id}`).then(result => {
            openNotification('bottomRight', result.status, '删除审核')
            refreshDraft()
        })
    }

    const refreshDraft = () => {
        axios.get(`/news?verifyState_ne=0&publishState_lte=1&_expand=category&author=${username}`).then(res => {
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
