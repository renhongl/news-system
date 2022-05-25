import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFoundPage from '../pages/notFound/NotFound'

export default function NotFound() {
    return (
        <Routes>
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

