import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import './style.scss'
import SideBar from '../../components/SideBar'
import TopHeader from '../../components/TopHeader'

const { Content } = Layout;

export default function Mgmt() {

  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <SideBar collapsed={collapsed}></SideBar>
      <Layout className="site-layout">
      <TopHeader collapsed={collapsed} toggle={toggle}></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}


