import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button, notification } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export default function Index() {

    const [data, setData] = useState([])
    const { username } = JSON.parse(localStorage.getItem('token'))

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
            dataIndex: 'title',
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button onClick={() => handleRemove(item)} type="primary">下线</Button>
                </div>
            }
        }
    ]

    const handleRemove = (item) => {
        axios.patch(`/news/${item.id}`, {
            publishState: 3
        }).then(res => {
            openNotification('bottomRight', res.status, '下线文章')
            loadData()
        })
    }

    const loadData = () => {
        axios.get(`/news?author=${username}&publishState=2`).then(res => {
            setData(res.data)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <Table dataSource={data} columns={columns} rowKey={(item) => item.id} pagination={{ pageSize: 5 }} />
    )
}
