import React from 'react'
import { HashRouter, Routes } from 'react-router-dom'

import AppRouter from './App'
import AuthRouter from './Auth'
import MgmtRouter from './Mgmt'
import NotFoundRouter from './NotFound'

export default function Index() {
  return (
    <React.Suspense>
      <HashRouter>
        <Routes>
          {AppRouter}
          {AuthRouter}
          {MgmtRouter}
          {NotFoundRouter}
        </Routes>
      </HashRouter>
    </React.Suspense>
  )
}
