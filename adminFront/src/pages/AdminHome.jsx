import React, { useState, useEffect } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { Navigate } from 'react-router-dom'

function AdminHome() {
    const [count, setCount] = useState(0)

    return (
        <>
            <main>
                {/* Admin Adiebar */}
                <AdminSidebar />
                <div className="page-content">
                    {/* Admin Header */}
                    <AdminHeader />

                    {/* Page Content Start */}
                    <div className="page-content-wrapper border">
                        {/* <!-- Title --> */}
                        <div className="row">
                            <div className="col-12">
                                <h1 className="h3 mb-2 mb-sm-0">Admin Dashboard</h1>
                                <button className='btn btn-primary w-100' onClick={() => setCount(count + 1)}>
                                    Count {count}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminHome
