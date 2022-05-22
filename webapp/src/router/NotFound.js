import React from 'react'
import { Route, Navigate } from 'react-router-dom'

// import NotFound from '../pages/notFound/NotFound'

const NotFound = React.lazy(() => import('../pages/notFound/NotFound'))

export default (
    <Route path="/">
        <Route path='/' element={<Navigate to='/app' />} />
        <Route path='*' element={<NotFound />} />
    </Route>
)

