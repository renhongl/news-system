import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout } from 'antd';
import './style.scss'
import SideBar from '../../components/mgmt/SideBar'
import TopHeader from '../../components/mgmt/TopHeader'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { Content } = Layout;

export default function Mgmt() {

  // NProgress.start()

  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  // useEffect(() => {
  //   // NProgress.done()
  // }, [location.hash, collapsed])

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
            overflow: 'auto'
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}


