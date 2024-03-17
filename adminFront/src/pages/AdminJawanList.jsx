import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AdminJawanList() {
    const [jawanList, setJawanList] = useState([])
    const getAllJawans = async () => {
        const res = await fetch('http://localhost:3000/api/admin/jawans', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("adminAuthKey")
            }
        });
        res.json().then((response) => {
            setJawanList(response.data);
            console.log(response.data)
        })
    }

    useEffect(() => {
        getAllJawans()
    }, [])
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const findPercentage = (solvedCases, totalCases) => {
        solvedCases = parseInt(solvedCases)
        totalCases = parseInt(totalCases)
        return (Math.round((solvedCases / totalCases) * 100))
    }

    return (
        <>
            <div className="row mb-3">
                <div className="col-12 d-sm-flex justify-content-between align-items-center">
                    <h1 className="h3 mb-2 mb-sm-0">Jawans List</h1>
                    <Link to="/admin/addjawan" className="btn btn-sm btn-primary mb-0">Add New Jawan</Link>
                </div>
            </div>
            {/* <!-- Card body START --> */}
            <div className="card-body px-0">
                {/* <!-- Tabs content START --> */}
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="nav-preview-tab-1">
                        <div className="row g-4">
                            {
                                jawanList.length > 0 ? 
                                    jawanList.map((item, index) => (
                                        // {/* <!-- Card item START --> */}
                                        <div className="col-md-6 col-xxl-4" key={index}>
                                            <div className="card bg-transparent border h-100">
                                                {/* <!-- Card header --> */}
                                                <div className="card-header bg-transparent border-bottom d-flex justify-content-between">
                                                    <div className="d-sm-flex align-items-center">
                                                        {/* <!-- Avatar --> */}
                                                        <div className="avatar avatar-md flex-shrink-0">
                                                            <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="avatar" />
                                                        </div>
                                                        {/* <!-- Info --> */}
                                                        <div className="ms-0 ms-sm-2 mt-2 mt-sm-0">
                                                            <h5 className="mb-0"><a href="#">{item.fullname}</a></h5>
                                                            <span className="text-body small"><i className="fas fa-fw fa-map-marker-alt me-1 mt-1"></i>
                                                                {item.address}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* <!-- Edit dropdown --> */}
                                                    <div className="dropdown text-end">
                                                        <a href="#" className="btn btn-sm btn-light btn-round small mb-0" role="button" id="dropdownShare2" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="bi bi-three-dots fa-fw"></i>
                                                        </a>
                                                        {/* <!-- dropdown button --> */}
                                                        <ul className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare2">
                                                            <li><a className="dropdown-item" href="#"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit</a></li>
                                                            <li><a className="dropdown-item" href="#"><i className="bi bi-trash fa-fw me-2"></i>Remove</a></li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="card-body">
                                                    {/* <!-- Solved Cases --> */}
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="icon-md bg-success bg-opacity-10 text-success rounded-circle flex-shrink-0">
                                                                <i className="bi bi-currency-dollar fa-fw"></i>
                                                            </div>
                                                            <h6 className="mb-0 ms-2 fw-light">Solved Cases</h6>
                                                        </div>
                                                        <span className="mb-0 fw-bold">{item.solvedCases ? item.solvedCases : 0}</span>
                                                    </div>

                                                    {/* <!-- Pending Cases --> */}
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="icon-md bg-purple bg-opacity-10 text-purple rounded-circle flex-shrink-0">
                                                                <i className="fas fa-book fa-fw"></i>
                                                            </div>
                                                            <h6 className="mb-0 ms-2 fw-light">Pending Course</h6>
                                                        </div>
                                                        <span className="mb-0 fw-bold">{item.pendingCases ? item.pendingCases : 0}</span>
                                                    </div>

                                                    {/* <!-- Total Cases --> */}
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="icon-md bg-purple bg-opacity-10 text-purple rounded-circle flex-shrink-0">
                                                                <i className="fas fa-book fa-fw"></i>
                                                            </div>
                                                            <h6 className="mb-0 ms-2 fw-light">Total Cases</h6>
                                                        </div>
                                                        <span className="mb-0 fw-bold">{item.totalCases ? item.totalCases : 0}</span>
                                                    </div>

                                                    {/* <!-- Progress --> */}
                                                    <div className="overflow-hidden">
                                                        <h6 className="mb-0">{findPercentage(item.solvedCases, item.totalCases)}%</h6>
                                                        <div className="progress progress-sm bg-primary bg-opacity-10">
                                                            <div className="progress-bar bg-primary aos" role="progressbar"
                                                                data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000"
                                                                data-aos-easing="ease-in-out" style={{ width: `${findPercentage(item.solvedCases, item.totalCases)}%` }} aria-valuenow="12"
                                                                aria-valuemin="0" aria-valuemax="100">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <!-- Card footer --> */}
                                                <div className="card-footer bg-transparent border-top">
                                                    <div className="d-sm-flex justify-content-between align-items-center">
                                                        {/* <!-- Rating star --> */}
                                                        <h6 className="mb-2 mb-sm-0">
                                                            <i className="bi bi-calendar fa-fw text-orange me-2"></i><span className="text-body">Join at:</span> 29 Aug 2021
                                                        </h6>
                                                        {/* <!-- Buttons --> */}
                                                        <div className="text-end text-primary-hover">
                                                            <a href="#" className="btn btn-link text-body p-0 mb-0 me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Message" aria-label="Message">
                                                                <i className="bi bi-envelope-fill"></i>
                                                            </a>
                                                            <a href="#" className="btn btn-link text-body p-0 mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Block" aria-label="Block">
                                                                <i className="fas fa-ban"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        // {/* <!-- Card item END --> */}
                                    ))
                                : 
                                <div className='loadingData'>...Loading</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminJawanList
