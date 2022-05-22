import React from 'react'

import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SmileOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Header } = Layout;

export default function index({ collapsed, toggle }) {

  const menu = (
    <Menu
      items={[
        {
          label: '超级管理员',
        },
        {
          danger: true,
          label: '退出',
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
        <span style={{marginRight: '10px'}}>
          欢迎admin回来
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
