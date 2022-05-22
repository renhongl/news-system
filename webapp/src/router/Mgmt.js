import React from 'react'
import { Navigate, Route } from 'react-router-dom'

// import NewsPage from '../pages/mgmt/News'
// import UserPage from '../pages/mgmt/User'
// import MgmtLayout from '../layouts/mgmt/Mgmt'
// import AuthComponent from '../core/auth/Auth'

const HomePage = React.lazy(() => import('../pages/mgmt/Home'))
const NewsPage = React.lazy(() => import('../pages/mgmt/News'))
const NewsWritePage = React.lazy(() => import('../pages/mgmt/Write'))
const NewsDraftPage = React.lazy(() => import('../pages/mgmt/Draft'))
const VerifyPage = React.lazy(() => import('../pages/mgmt/Verify'))
const VerifyListPage = React.lazy(() => import('../pages/mgmt/VerifyList'))
const BeforePublishPage = React.lazy(() => import('../pages/mgmt/BeforePublish'))
const PublishedPage = React.lazy(() => import('../pages/mgmt/Published'))
const RemovedPage = React.lazy(() => import('../pages/mgmt/Removed'))
const RolePage = React.lazy(() => import('../pages/mgmt/Role'))
const RightPage = React.lazy(() => import('../pages/mgmt/Right'))
const UserPage = React.lazy(() => import('../pages/mgmt/User'))
const MgmtLayout = React.lazy(() => import('../layouts/mgmt/Mgmt'))
const AuthComponent = React.lazy(() => import('../core/auth/Auth'))

export default (
    <Route path='/mgmt' element={<MgmtLayout />}>
        <Route index element={<Navigate to='/mgmt/home' />}></Route>
        <Route path='home' element={<AuthComponent><HomePage /></AuthComponent>}></Route>

        <Route path='user-manage/list' element={<AuthComponent><UserPage /></AuthComponent>}></Route>

        <Route path='right-manage/role-list' element={<AuthComponent><RolePage /></AuthComponent>}></Route>
        <Route path='right-manage/right-list' element={<AuthComponent><RightPage /></AuthComponent>}></Route>

        <Route path='news-manage/category' element={<AuthComponent><NewsPage /></AuthComponent>}></Route>
        <Route path='news-manage/write' element={<AuthComponent><NewsWritePage /></AuthComponent>}></Route>
        <Route path='news-manage/draft' element={<AuthComponent><NewsDraftPage /></AuthComponent>}></Route>

        <Route path='verify-manage/news' element={<AuthComponent><VerifyPage /></AuthComponent>}></Route>
        <Route path='verify-manage/list' element={<AuthComponent><VerifyListPage /></AuthComponent>}></Route>

        <Route path='publish-manage/before' element={<AuthComponent><BeforePublishPage /></AuthComponent>}></Route>
        <Route path='publish-manage/done' element={<AuthComponent><PublishedPage /></AuthComponent>}></Route>
        <Route path='publish-manage/removed' element={<AuthComponent><RemovedPage /></AuthComponent>}></Route>

    </Route>
)
