import React, { useState, useEffect } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { Navigate } from 'react-router-dom'

function AdminHome() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1>Admin Panel</h1>
            <button className='btn btn-primary' onClick={() => setCount(count + 1)}>Count {count}</button>
        </>
    )
}

export default AdminHome
