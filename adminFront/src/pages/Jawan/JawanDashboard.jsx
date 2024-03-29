import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import JawanHeader from '../../components/Jawan/JawanHeader'
import JawanSidebar from '../../components/Jawan/JawanSidebar'

function JawanDashboard() {
    const [jawanData, setJawanData] = useState(null)

    useEffect(() => {
        const jawan_data = localStorage.getItem("jawan_data");
        if (jawan_data !== null) {
            setJawanData(JSON.parse(jawan_data))
        }
    }, []);

    return (
        <>
            <JawanHeader />

            <main>
                {/* Banner Section */}
                <section className="pt-0">
                    <div className="container-fluid px-0">
                        <div className="card bg-blue h-100px h-md-200px rounded-0"
                            style={{
                                background: 'url(http://localhost:5173/public/images/04.png) no-repeat center center',
                                backgroundSize: 'cover'
                            }}
                        >
                        </div>
                    </div>
                    <div className="container mt-n4">
                        <div className="row">
                            <div className="col-12">
                                <div className="card bg-transparent card-body pb-0 px-0 mt-2 mt-sm-0">
                                    <div className="row d-sm-flex justify-sm-content-between mt-2 mt-md-0">
                                        {/* <!-- Avatar --> */}
                                        <div className="col-auto">
                                            <div className="avatar avatar-xxl position-relative mt-n3">
                                                <img className="avatar-img rounded-circle border border-white border-3 shadow"
                                                    src={jawanData ? jawanData.profilePhoto : ""} alt="" />
                                                {/* <span className="badge text-bg-success rounded-pill position-absolute top-50 start-100 translate-middle mt-4 mt-md-5 ms-n3 px-md-3">Pro</span> */}
                                            </div>
                                        </div>
                                        {/* <!-- Profile info --> */}
                                        <div className="col d-sm-flex justify-content-between align-items-center">
                                            <div>
                                                <h1 className="my-1 fs-4">{jawanData ? jawanData.fullname : ""}</h1>
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item me-3 mb-1 mb-sm-0">
                                                        <span className="h6">{jawanData ? jawanData.totalCases : ""}</span>
                                                        <span className="text-body fw-light"> Assigned Cases</span>
                                                    </li>
                                                    <li className="list-inline-item me-3 mb-1 mb-sm-0">
                                                        <span className="h6">{jawanData ? jawanData.solvedCases : ""}</span>
                                                        <span className="text-body fw-light"> Solved Cases Tasks</span>
                                                    </li>
                                                    <li className="list-inline-item me-3 mb-1 mb-sm-0">
                                                        <span className="h6">{jawanData ? jawanData.totalCases - jawanData.solvedCases : ""}</span>
                                                        <span className="text-body fw-light"> Pending Cases</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <!-- Button --> */}
                                            <div className="mt-2 mt-sm-0">
                                                <Link to='/jawan/attendence' className="btn btn-outline-primary mb-0">
                                                    Mark Attendence
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Advanced filter responsive toggler START --> */}
                                {/* <!-- Divider --> */}
                                <hr className="d-xl-none" />
                                <div className="col-12 col-xl-3 d-flex justify-content-between align-items-center">
                                    <a className="h6 mb-0 fw-bold d-xl-none" href="#">Menu</a>
                                    <button className="btn btn-primary d-xl-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                                        <i className="fas fa-sliders-h"></i>
                                    </button>
                                </div>
                                {/* <!-- Advanced filter responsive toggler END --> */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* main content section */}
                <section className="pt-0">
                    <div className="container">
                        <div className="row">
                            {/* <!-- Left sidebar START --> */}
                            <JawanSidebar />

                            {/* main content */}
                            <div className="col-xl-9">
                                {/* <div className="atten_container mb-4 h-50">
                                    <div className="attendence_div d-flex align-items-center bg-primary bg-opacity-15 rounded-3 h-100">
                                        <button className='btn btn-primary h-50 w-25 mx-3'>
                                            Check In
                                        </button>
                                    </div>
                                </div> */}
                                <div className="row mb-4">
                                    {/* <!-- Counter item --> */}
                                    <div className="col-sm-6 col-lg-6 mb-3 mb-lg-0">
                                        <div className="d-flex justify-content-center align-items-center p-4 bg-orange bg-opacity-15 rounded-3">
                                            <span className="display-6 lh-1 text-orange mb-0">
                                                <i className="fas fa-tv fa-fw"></i>
                                            </span>
                                            <div className="ms-4">
                                                <div className="d-flex">
                                                    <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0"
                                                        data-purecounter-end={jawanData ? jawanData.totalCases : "10"} data-purecounter-delay="200">
                                                        {jawanData ? jawanData.totalCases : ""}
                                                    </h5>
                                                </div>
                                                <p className="mb-0 h6 fw-light">Assigned Cases</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Counter item --> */}
                                    <div className="col-sm-6 col-lg-6 mb-3 mb-lg-0">
                                        <div className="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-15 rounded-3">
                                            <span className="display-6 lh-1 text-purple mb-0">
                                                <i className="fas fa-clipboard-check fa-fw"></i>
                                            </span>
                                            <div className="ms-4">
                                                <div className="d-flex">
                                                    <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0"
                                                        data-purecounter-end={jawanData ? jawanData.solvedCases : "10"} data-purecounter-delay="200">
                                                        {jawanData ? jawanData.solvedCases : "10"}
                                                    </h5>
                                                </div>
                                                <p className="mb-0 h6 fw-light">Completed Cases</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default JawanDashboard
