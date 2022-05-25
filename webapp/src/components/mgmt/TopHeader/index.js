import React, { useEffect } from 'react'

import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SmileOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { changeTitle } from './slice';
import { clearToken } from '../../../pages/auth/signinSlice'
const { Header } = Layout;

export default function Index({ collapsed, toggle }) {

  const navigate = useNavigate()
  const token = useSelector(state => state.signin.token)
  const roleName = token.role.roleName
  const title = useSelector(state => state.topHeader.title)
  const location = useLocation()
  const dispatch = useDispatch()


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
            dispatch(clearToken())
            navigate('/auth/signin', { replace: true })
          }
        },
      ]}
    />
  );

  return (
    <Header className="site-layout-background" style={{ padding: 0, display: 'flex', justifyContent: 'space-between', paddingRight: '20px' }}>
      <div>{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
        <span style={{fontWeight: 'bold', fontSize: '20px'}}>{title}</span>
      </div>
      <div>

        <span style={{ marginRight: '10px' }}>
          欢迎<span style={{ color: '#1890ff', margin: '0 4px' }}>{token.username}</span>回来
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
