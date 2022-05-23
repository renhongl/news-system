import React from 'react'

import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SmileOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'

const { Header } = Layout;

export default function Index({ collapsed, toggle }) {

  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('token'))
  const roleName = token.role.roleName

  const menu = (
    <Menu
      items={[
        {
          label: roleName,
        },
        {
          danger: true,
          label: '退出',
          onClick: () => {
            localStorage.removeItem('token')
            navigate('/auth/signin', { replace: true })
          }
        },
      ]}
    />
  );

  return (
    <Header className="site-layout-background" style={{ padding: 0, display: 'flex', justifyContent: 'space-between', paddingRight: '20px' }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
      <div>
        <span style={{ marginRight: '10px' }}>
          欢迎<span style={{color: '#1890ff', margin: '0 4px'}}>{token.username}</span>回来
        </span>
        <span>
          <Dropdown overlay={menu}>
            <a onClick={e => e.preventDefault()}>
              <Avatar icon={<UserOutlined />} />
            </a>
          </Dropdown>
        </span>
      </div>
    </Header>
  )
}
