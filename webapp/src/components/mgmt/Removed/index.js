import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button, notification } from 'antd'
import { EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { useSelector } from 'react-redux';
export default function Index() {

    const [data, setData] = useState([])
    const { username } = useSelector(state => state.signin.token)

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
            dataIndex: 'title',
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '文章分类',
            dataIndex: 'category',
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button onClick={() => handleDelete(item)} type="primary">删除</Button>
                </div>
            }
        }
    ]

    const handleDelete = (item) => {
        axios.delete(`/news/${item.id}`).then(res => {
            openNotification('bottomRight', res.status, '删除文章')
            loadData()
        })
    }

    const loadData = () => {
        axios.get(`/news?author=${username}&publishState=3`).then(res => {
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
