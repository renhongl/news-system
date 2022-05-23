import React, { useState, useEffect } from 'react'
import { HashRouter, Routes } from 'react-router-dom'

import AppRouter from './App'
import AuthRouter from './Auth'
import MgmtRouter from './Mgmt'
import NotFoundRouter from './NotFound'
import axios from 'axios'


export default function Index() {

  const [permission, setPermission] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get('/rights'),
      axios.get('/children'),
    ]).then(res => {
      const data = [...res[0].data, ...res[1].data]
      setPermission(data)
    })
  }, [])

  return (
    <React.Suspense>
      <HashRouter>
        <Routes>
          {AppRouter}
          {AuthRouter}
          {MgmtRouter(permission)}
          {permission.length > 0 && NotFoundRouter}
        </Routes>
      </HashRouter>
    </React.Suspense>
  )
}
