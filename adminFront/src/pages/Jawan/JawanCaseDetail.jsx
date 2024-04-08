import React, { useState, useEffect } from 'react'
import JawanHeader from '../../components/Jawan/JawanHeader'
import JawanSidebar from '../../components/Jawan/JawanSidebar'
import { useNavigate, useParams } from 'react-router-dom'

function JawanCaseDetail() {
    const [jawanData, setJawanData] = useState(null)
    const [caseDetail, setCaseDetail] = useState(null)
    const params = useParams();
    const case_id = params.id;

    const navigate = useNavigate()
    useEffect(() => {
        const jawan_data = localStorage.getItem("jawan_data");
        if (jawan_data !== null) {
            setJawanData(JSON.parse(jawan_data))
        } else {
            navigate('/jawan/login')
        };
    }, []);

    const getSingleCaseDetail = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/jawan/jawansinglecases/${case_id}`, {
                method: "GET",
                headers: {
                    "authorization": localStorage.getItem("jawanAuthKey"),
                    "Content-type": "application/json",
                },
            });
            if (response.ok) {
                response.json().then((res) => {
                    setCaseDetail(res.data)
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                console.log("no response");
            }
        } catch (error) {
            console.log(error);
        }
    }
    // Get Case Detail
    useEffect(() => {
        getSingleCaseDetail()
    }, [])


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

                {/* main section */}
                {/* main content section */}
                <section className="pt-0">
                    <div className="container">
                        <div className="row">
                            {/* <!-- Left sidebar START --> */}
                            <JawanSidebar />

                            <div className="col-xl-9">
                                {/* jawan Cases */}
                                <h3>Case Detail</h3>
                                <div className="container shadow p-4 rounded-4">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6"><h6 className='text-black-50'>Case Title </h6></div>
                                                <div className="col-6"><h6 className='text-blue'>{caseDetail ? caseDetail.title : ""}</h6></div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6"><h6 className='text-black-50'>Case Location </h6></div>
                                                <div className="col-6"><h6 className='text-blue'>{caseDetail ? caseDetail.location : ""}</h6></div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6"><h6 className='text-black-50'>Assigned Jawan </h6></div>
                                                <div className="col-6"><h6 className='text-blue'>{jawanData ? jawanData.fullname : ""}</h6></div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6"><h6 className='text-black-50'>Case Category </h6></div>
                                                <div className="col-6"><h6 className='text-blue'>{caseDetail ? caseDetail.caseCategory : ""}</h6></div>
                                            </div>
                                        </div>
                                        <div className="col-6 my-3">
                                            <div className="row">
                                                <div className="col-6"><h6 className='text-black-50'>Event Timing</h6></div>
                                                <div className="col-6"><h6 className='text-blue'>{caseDetail ? new Date(caseDetail.dateTime).toDateString() : ""}</h6></div>
                                            </div>
                                        </div>
                                        <div className="col-6 my-3">
                                            <div className="row">
                                                <div className="col-6"><h6 className='text-black-50'>Case Current Status</h6></div>
                                                <div className="col-6"><h6 className='text-blue'>{caseDetail ? caseDetail.remarks : ""}</h6></div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <h6 className='text-black-50'>Case Proof</h6>
                                            <img src={caseDetail ? caseDetail.caseRecords[0] : "No on ground situation image"} alt="" />
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

export default JawanCaseDetail