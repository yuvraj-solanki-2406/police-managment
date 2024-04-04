import React, { useEffect, useState } from 'react'
import JawanHeader from '../../components/Jawan/JawanHeader'
import JawanSidebar from '../../components/Jawan/JawanSidebar'
import { useNavigate } from 'react-router-dom'

function JawanProfile() {
    const navigate = useNavigate()

    const [jawanData, setJawanData] = useState(null);
    useEffect(() => {
        const jawan_data = localStorage.getItem("jawan_data");
        if (jawan_data !== null) {
            setJawanData(JSON.parse(jawan_data))
        } else {
            navigate('/jawan/login')
        };
    }, []);

    useEffect(() => {
        if (jawanData) {
            setJawanEditData({
                fullname: jawanData.fullname || "",
                email: jawanData.email || "",
                address: jawanData.address || "",
                addharCard: jawanData.addharCard || "",
            });
        }
    }, [jawanData]);

    const [jawanEditData, setJawanEditData] = useState({
        fullname: "",
        email: "",
        address: "",
        addharCard: ""
    });

    const handlejawanEdit = (e) => {
        const { name, value } = e.target;
        setJawanEditData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    };

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

                {/* main content section */}
                <section className="pt-0">
                    <div className="container">
                        <div className="row">
                            {/* <!-- Left sidebar START --> */}
                            <JawanSidebar />

                            {/* main content */}
                            <div className="col-xl-9">
                                <div className="container border rounded-3 p-4 shadow">
                                    <form className="row g-4" encType="multipart/form-data">
                                        {/*<!-- Profile picture -->*/}
                                        <div className="col-12 justify-content-center align-items-center">
                                            <label className="form-label">Profile picture</label>
                                            <div className="d-flex align-items-center">
                                                <label className="position-relative me-4" htmlFor="uploadfile-1" title="Replace this pic">
                                                    {/*<!-- Avatar place holder -->*/}
                                                    <span className="avatar avatar-xl">
                                                        <img id="uploadfile-1-preview" className="avatar-img rounded-circle border border-white border-3"
                                                            src="../../../public/images/08.jpg" alt="" />
                                                    </span>
                                                    {/*<!-- Remove btn -->*/}
                                                    <button type="button" className="uploadremove"><i className="bi bi-x text-white"></i></button>
                                                </label>
                                                {/*<!-- Upload button -->*/}
                                                <label className="btn btn-primary-soft mb-0" htmlFor="uploadfile-1">Change</label>
                                                <input id="uploadfile-1" name='profilePhoto' className="form-control d-none" type="file"
                                                />
                                            </div>
                                        </div>

                                        {/*<!-- Full name -->*/}
                                        <div className="col-md-6">
                                            <label className="form-label">Full name</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="fullname" placeholder="Full name"
                                                    value={jawanEditData.fullname} onChange={handlejawanEdit} />
                                            </div>
                                        </div>

                                        {/*<!-- Email id -->*/}
                                        <div className="col-md-6">
                                            <label className="form-label">Email id</label>
                                            <input className="form-control" type="email" name="email" placeholder="Email"
                                                value={jawanEditData.email} onChange={handlejawanEdit} />
                                        </div>

                                        {/*<!-- Address -->*/}
                                        <div className="col-md-6">
                                            <label className="form-label">Address</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="address" placeholder='Address'
                                                    value={jawanEditData.address} onChange={handlejawanEdit} />
                                            </div>
                                        </div>

                                        {/*<!-- Adhaar Number -->*/}
                                        <div className="col-md-6">
                                            <label className="form-label">Adhaar Number</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="adhaar_num" placeholder='Adhaar Number'
                                                    value={jawanEditData.addharCard} onChange={handlejawanEdit} />
                                            </div>
                                        </div>

                                        <div className="d-sm-flex justify-content-end">
                                            <button type="submit" className="btn btn-primary mb-0">Update Details</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default JawanProfile
