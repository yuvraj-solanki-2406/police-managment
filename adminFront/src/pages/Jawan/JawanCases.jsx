import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import JawanSidebar from '../../components/Jawan/JawanSidebar';
import JawanHeader from '../../components/Jawan/JawanHeader';

function JawanCases() {
    const [jawanData, setJawanData] = useState(null)
    const [jawanCaseData, setJawanCaseData] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const jawan_data = localStorage.getItem("jawan_data");
        if (jawan_data !== null) {
            setJawanData(JSON.parse(jawan_data))
        } else {
            navigate('/jawan/login')
        };
    }, []);

    const getAssignedCase = async () => {
        let j_id = JSON.parse(localStorage.getItem("jawan_data"))._id;

        const response = await fetch(`http://localhost:3000/api/jawan/jawancases/${j_id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "authorization": localStorage.getItem("jawanAuthKey")
            }
        });
        if (response.status == 200) {
            response.json().then((res) => {
                console.log("Response ", res)
                setJawanCaseData(res);
            }).catch((err) => {
                console.log(err)
            })
        }
    };

    useEffect(() => {
        if (jawanData != null) {
        }
        getAssignedCase();
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
                                            {/* <!-- Button -->
                                            <div className="mt-2 mt-sm-0">
                                                <Link to='/jawan/attendence' className="btn btn-outline-primary mb-0">
                                                    Mark Attendence
                                                </Link>
                                            </div> */}
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
                                {/* jawan Cases */}
                                <h3>Jawan All Cases</h3>
                                <div className="container-fluid p-1">
                                    <table className='table table-bordered table-hover'>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Title</th>
                                                <th>Case Category</th>
                                                <th>Location</th>
                                            </tr>
                                        </thead>
                                        {
                                            jawanCaseData ?
                                                jawanCaseData.data.map((item, key) => (
                                                    <tbody>
                                                        <tr key={item._id}>
                                                            <td>{1}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.caseCategory}</td>
                                                            <td>{item.location}</td>
                                                        </tr>
                                                    </tbody>
                                                ))
                                                :
                                                <span>
                                                    ...Loading
                                                </span>
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default JawanCases
