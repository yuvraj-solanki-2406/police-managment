import React, { useState, useEffect } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { Navigate } from 'react-router-dom'

function AdminHome() {
    const [caseCount, setCaseCount] = useState(0);
    const [caseDetail, setCaseDetails] = useState([]);
    const [jawanCount, setJawanCount] = useState(0);
    const [jawanDetail, setJawanDetail] = useState([]);


    const getAllCases = async () => {
        const caseResponse = await fetch("http://localhost:3000/api/admin/cases", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("adminAuthKey")
            }
        });
        if (caseResponse.ok) {
            caseResponse.json().then((res) => {
                let all_cases = res.data.length;;
                setCaseDetails(res.data);
                setCaseCount(all_cases);
            });
        }
    }

    const getAllJawans = async () => {
        const caseResponse = await fetch("http://localhost:3000/api/admin/jawans", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("adminAuthKey")
            }
        });
        if (caseResponse.ok) {
            caseResponse.json().then((res) => {
                let all_jawans = res.data.length;;
                setJawanCount(all_jawans);
                setJawanDetail(res.data);
            })
        }
    }

    useEffect(() => {
        getAllCases();
        getAllJawans();
    }, [])

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
                            </div>
                        </div>

                        {/* <!-- Counter boxes START --> */}
                        <div className="row g-4 mb-4">
                            {/* <!-- Counter item --> */}
                            <div className="col-md-6">
                                <div className="card card-body bg-warning bg-opacity-15 p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        {/* <!-- Digit --> */}
                                        <div>
                                            <h2 className="purecounter mb-0 fw-bold"
                                                data-purecounter-start="0" data-purecounter-end={caseCount}
                                                data-purecounter-delay="200">{caseCount}</h2>
                                            <span className="mb-0 h6 fw-light">Total Cases</span>
                                        </div>
                                        {/* <!-- Icon --> */}
                                        <div className="icon-lg rounded-circle bg-warning text-white mb-0">
                                            <i className="fas fa-file fa-fw"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Counter item --> */}
                            <div className="col-md-6">
                                <div className="card card-body bg-purple bg-opacity-10 p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        {/* <!-- Digit --> */}
                                        <div>
                                            <h2 className="purecounter mb-0 fw-bold" data-purecounter-start="0"
                                                data-purecounter-end={jawanCount} data-purecounter-delay="200">
                                                {jawanCount}
                                            </h2>
                                            <span className="mb-0 h6 fw-light">Total Jawans</span>
                                        </div>
                                        {/* <!-- Icon --> */}
                                        <div className="icon-lg rounded-circle bg-purple text-white mb-0">
                                            <i className="fas fa-user-tie fa-fw"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="case_content mt-3 table-responsive">
                            <h4 className='test-blue'>Cases List</h4>
                            <table className='table table-border table-hover'>
                                <thead>
                                    <tr className='text-black'>
                                        <th>Case Title</th>
                                        <th>Case Category</th>
                                        <th>Case Location</th>
                                        <th>Case Timing</th>
                                        <th>Case Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        caseDetail ?
                                            caseDetail.map((item, key) => (
                                                <tr key={key}>
                                                    <td>{item.title}</td>
                                                    <td>{item.caseCategory}</td>
                                                    <td>{item.location}</td>
                                                    <td>{new Date(item.dateTime).toDateString()}</td>
                                                    <td>{item.remarks}</td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td className='loadingData'>...Loading</td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="case_content mt-3 table-responsive">
                            <h4 className='test-blue'>Jawan List</h4>
                            <table className='table table-border table-hover'>
                                <thead>
                                    <tr className='text-black'>
                                        <th>Jawan Image</th>
                                        <th>Jawan Name</th>
                                        <th>Jawan Email</th>
                                        <th>Jawan Phone</th>
                                        <th>Jawan Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        jawanDetail ?
                                            jawanDetail.map((item, key) => (
                                                <tr key={key}>
                                                    <td><img src={item ? item.profilePhoto : "../../images/04.png"} alt="image" className='table_image_rf' /></td>
                                                    <td>{item.fullname}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.address}</td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td className='loadingData'>...Loading</td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminHome
