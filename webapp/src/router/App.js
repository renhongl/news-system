import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// import lazyLoad from '../core/lazyLoad'
// import AppLayout from '../layouts/app/App'
// import NewsPage from '../pages/app/News'

const AppLayout = React.lazy(() => import('../layouts/app/App'))
const NewsPage = React.lazy(() => import('../pages/app/News'))
const NotFoundPage = React.lazy(() => import('../pages/notFound/NotFound'))

export default function App() {
    return (
        <Routes>
            <Route path='/app' element={<AppLayout />}>
                <Route index element={<Navigate to='/app/news' />}></Route>
                <Route path='news' element={<NewsPage />}></Route>
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}


