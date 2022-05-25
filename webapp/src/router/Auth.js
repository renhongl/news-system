import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// import AuthLayout from '../layouts/auth/Auth'
// import RegisterPage from '../pages/auth/Register'
// import SignInPage from '../pages/auth/Signin'

const RegisterPage = React.lazy(() => import('../pages/auth/Register'))
const SignInPage = React.lazy(() => import('../pages/auth/Signin'))
const NotFoundPage = React.lazy(() => import('../pages/notFound/NotFound'))
const AuthLayout = React.lazy(() => import('../layouts/auth/Auth'))


export default function Auth() {
    return (
        <Routes>
            <Route path='/auth' element={<AuthLayout />}>
                <Route index element={<Navigate to='/auth/signin' />}></Route>
                <Route path='signin' element={<SignInPage />}></Route>
                <Route path='register' element={<RegisterPage />}></Route>
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}
