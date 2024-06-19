import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom'

function PrivateRouter({ children, ...rest }) {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return userInfo && userInfo.isAdmin ? children : <Navigate to="/login" />
}

export default PrivateRouter