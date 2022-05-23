import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, notification, Tag } from 'antd'
import axios from 'axios'
import { EditOutlined, DeleteOutlined, DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const { confirm } = Modal;

export default function Index() {
    const [draftList, setDraftList] = useState([])
    const stateList = ['', '审核中', '已通过', '未通过']
    const colorState = ['', 'orange', 'green', 'red', 'blue']
    const navigate = useNavigate()
    const { roleId, username, region } = JSON.parse(localStorage.getItem('token'))

    const openNotification = (placement, message, title = '删除权限') => {
        notification.info({
            message: title,
            description: message,
            placement,
        });
    };

    const columns = [
        {
            title: '新闻标题',
            render: (item) => {
                return <a href={`#/mgmt/news-manage/preview/${item.id}`}>{item.title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            render: (item) => {
                return item.title
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button onClick={() => {passNews(item)}} style={{ marginLeft: '10px' }} type="primary" >通过</Button>
                    <Button onClick={() => {rejectNews(item)}} style={{ marginLeft: '10px' }} type="danger" >驳回</Button>
                </div>
            }
        },
    ];

    const rejectNews = (item) => {
        axios.patch(`/news/${item.id}`, {
            verifyState: 3,
        }).then(res => {
            openNotification('bottomRight', res.status, '驳回文章')
            refreshDraft()
        })
    }

    const passNews = (item) => {
        axios.patch(`/news/${item.id}`, {
            verifyState: 2,
        }).then(res => {
            openNotification('bottomRight', res.status, '审核通过')
            refreshDraft()
        })
    }

    const refreshDraft = () => {
        axios.get(`/news?verifyState=1&_expand=category`).then(res => {
            const data = res.data
            setDraftList(roleId === 1001 ? data : [
                ...data.filter(item => item.author === username),
                ...data.filter(item => item.region === region && item.roleId === 1003)
            ])
        })
    }

    useEffect(() => {
        refreshDraft()
    }, [])

    return (
        <Table dataSource={draftList} columns={columns} pagination={{ size: 5 }} rowKey={(item) => item.id} />
    )
}
