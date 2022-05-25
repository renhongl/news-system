import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import AppRouter from './App'
import AuthRouter from './Auth'
import MgmtRouter from './Mgmt'
import NotFoundRouter from './NotFound'

import AuthComponent from '../core/auth/Auth'

export default function Index() {
  return (
    <React.Suspense>
      <HashRouter>
        <AuthRouter />
        <AppRouter />
        <MgmtRouter />
        <NotFoundRouter />
        <Routes>
        </Routes>
      </HashRouter>
    </React.Suspense>
  )
}
