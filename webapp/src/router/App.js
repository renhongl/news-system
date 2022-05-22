import React from 'react'
import { Navigate, Route } from 'react-router-dom'

// import lazyLoad from '../core/lazyLoad'
// import AppLayout from '../layouts/app/App'
// import NewsPage from '../pages/app/News'

const AppLayout = React.lazy(() => import('../layouts/app/App'))
const NewsPage = React.lazy(() => import('../pages/app/News'))

export default (
    <Route path='/app' element={<AppLayout />}>
        <Route index element={<Navigate to='/app/news' />}></Route>
        <Route path='news' element={<NewsPage />}></Route>
    </Route>
)

