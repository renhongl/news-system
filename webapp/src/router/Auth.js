import React from 'react'
import { Navigate, Route } from 'react-router-dom'

// import AuthLayout from '../layouts/auth/Auth'
// import RegisterPage from '../pages/auth/Register'
// import SignInPage from '../pages/auth/Signin'

const RegisterPage = React.lazy(() => import('../pages/auth/Register'))
const SignInPage = React.lazy(() => import('../pages/auth/Signin'))
const AuthLayout = React.lazy(() => import('../layouts/auth/Auth'))

export default (
    <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<Navigate to='/auth/signin' />}></Route>
        <Route path='signin' element={<SignInPage />}></Route>
        <Route path='register' element={<RegisterPage />}></Route>
    </Route>
)
