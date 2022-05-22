import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function WithRouter(Component) {
    const location = useLocation()
    const push = useNavigate()
    const match = useParams()
    return function () {
        return <Component {...props} history={{location, push, match}}/>
    }
}
