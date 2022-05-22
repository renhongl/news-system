import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Auth({ children }) {
    const isAuth = localStorage.getItem('token')
    return isAuth ? children : <Navigate to='/auth/signin' />
}
