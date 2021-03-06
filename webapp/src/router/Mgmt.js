import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux';


import HomePage from '../pages/mgmt/Home'

import NewsPage from '../pages/mgmt/News'
import NewsWritePage from '../pages/mgmt/Write'
import NewsDraftPage from '../pages/mgmt/Draft'
import NewsPreviewPage from '../pages/mgmt/Preview'
import NewsUpdatePage from '../pages/mgmt/Update'

import VerifyPage from '../pages/mgmt/Verify'
import VerifyListPage from '../pages/mgmt/VerifyList'

import BeforePublishPage from '../pages/mgmt/BeforePublish'
import PublishedPage from '../pages/mgmt/Published'
import RemovedPage from '../pages/mgmt/Removed'

import RolePage from '../pages/mgmt/Role'
import RightPage from '../pages/mgmt/Right'

import UserPage from '../pages/mgmt/User'

import MgmtLayout from '../layouts/mgmt/Mgmt'

import NotFoundPage from '../pages/notFound/NotFound'

// const HomePage = React.lazy(() => import('../pages/mgmt/Home'))
// const NewsPage = React.lazy(() => import('../pages/mgmt/News'))
// const NewsWritePage = React.lazy(() => import('../pages/mgmt/Write'))
// const NewsDraftPage = React.lazy(() => import('../pages/mgmt/Draft'))
// const VerifyPage = React.lazy(() => import('../pages/mgmt/Verify'))
// const VerifyListPage = React.lazy(() => import('../pages/mgmt/VerifyList'))
// const BeforePublishPage = React.lazy(() => import('../pages/mgmt/BeforePublish'))
// const PublishedPage = React.lazy(() => import('../pages/mgmt/Published'))
// const RemovedPage = React.lazy(() => import('../pages/mgmt/Removed'))
// const RolePage = React.lazy(() => import('../pages/mgmt/Role'))
// const RightPage = React.lazy(() => import('../pages/mgmt/Right'))
// const UserPage = React.lazy(() => import('../pages/mgmt/User'))

// const MgmtLayout = React.lazy(() => import('../layouts/mgmt/Mgmt'))
// const AuthComponent = React.lazy(() => import('../core/auth/Auth'))

const routerMapping = {
    '/home': <HomePage />,
    "/user-manage/list": <UserPage />,
    "/right-manage/role-list": <RolePage />,
    "/right-manage/right-list": <RightPage />,
    "/news-manage/draft": <NewsDraftPage />,
    "/news-manage/write": <NewsWritePage />,
    "/news-manage/category": <NewsPage />,
    "/news-manage/preview/:id": <NewsPreviewPage />,
    "/news-manage/update/:id": <NewsUpdatePage />,
    "/verify-manage/list": <VerifyListPage />,
    "/verify-manage/news": <VerifyPage />,
    "/publish-manage/before": <BeforePublishPage />,
    "/publish-manage/done": <PublishedPage />,
    "/publish-manage/removed": <RemovedPage />
}

export default function Mgmt() {
    const [permission, setPermission] = useState([])
    const [rights, setRights] = useState(null)
    const navigate = useNavigate()
    const token = useSelector(state => state.signin.token)

    const checkRoute = (item) => {
        return routerMapping[item.key] && (item.pagepermission === 1 || item.routerpermission === 1)
    }

    const checkUser = (item, rights) => {
        return rights.includes(item.key)
    }

    useEffect(() => {
        Promise.all([
            axios.get('/rights'),
            axios.get('/children'),
        ]).then(res => {
            const data = [...res[0].data, ...res[1].data]
            setPermission(data)
        })
    }, [])

    useEffect(() => {
        if (!token) {
            navigate('/auth/signin', {replace: true})
        }
        token && setRights(token.role.rights)
    }, [token])

    return (
        <Routes>
            {
                permission && rights && <Route path='/mgmt' element={<MgmtLayout />}>
                    <Route index element={<Navigate to='/mgmt/home' />}></Route>
                    {
                        permission.map(item => {
                            if (checkRoute(item) && checkUser(item, rights)) {
                                return <Route
                                    key={item.key}
                                    path={'/mgmt' + item.key}
                                    element={routerMapping[item.key]}
                                ></Route>
                            }
                        })
                    }
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            }
        </Routes>
    )
}
