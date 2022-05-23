import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Checkbox, Button, message } from 'antd'
import axios from 'axios'

export default function SignIn() {

  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Success:', values);
    axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
      console.log(res.data)
      if (res.data.length === 0) {
        message.error('用户名与密码不匹配')
      } else {
        localStorage.setItem('token', JSON.stringify(res.data[0]))
        navigate('/mgmt', { replace: true })
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section style={{background: '#fff', padding: '20px', width: '400px', zIndex: 10}}>
      <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px'}}>登录</div>
      <Form
        name="basic"
        layout="vertical"
        
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}
