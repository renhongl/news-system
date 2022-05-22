import React, { useEffect, useState } from 'react'

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './style.scss'

const { Sider } = Layout;

export default function Index({ collapsed }) {

  const navigate = useNavigate()
  const location = useLocation()

  const [items, setItems] = useState([])
  const iconMapping = {
    '/mgmt/home': <UserOutlined />,
    '/mgmt/user': <UserOutlined />,
    'user': <UserOutlined />,
    'role': <UserOutlined />,
    '/mgmt/role': <UserOutlined />,
    '/mgmt/right': <UserOutlined />,
  }

  const filterItems = (items) => {
    return items.filter(item => {
      item.label = item.title
      item.key = '/mgmt' + item.key
      item.icon = iconMapping[item.key] || <UserOutlined />;
      delete item.rightId
      if (item?.children?.length > 0) {
        item.children = filterItems(item.children)
      } else {
        delete item.children
      }
      return item.pagepermission === 1;
    })
  }

  useEffect(() => {
    // axios.get('https://my-json-server.typicode.com/renhongl/news-system-api/rights?_embed=children').then(result => {
      axios.get('http://localhost:5000/rights?_embed=children').then(result => {
      const data = filterItems(result.data)
      setItems(data)
    })
  }, [])


  const handClick = (item) => {
    navigate(item.key, { replace: true })
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">全球新闻发布系统</div>
      {items?.length > 0 && <Menu
        theme="dark"
        mode="inline"
        onClick={(e) => handClick(e)}
        selectedKeys={[location.pathname]}
        items={items}
      />}
    </Sider>
  )
}
