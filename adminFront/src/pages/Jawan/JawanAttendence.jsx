import React, { useState, useEffect } from 'react'
import JawanHeader from '../../components/Jawan/JawanHeader'
import JawanSidebar from '../../components/Jawan/JawanSidebar'
import Calendar from '../../components/Jawan/Calender'
import { Link } from 'react-router-dom'

function JawanAttendence() {
    const [jawanData, setJawanData] = useState(null)

    useEffect(() => {
        const jawan_data = localStorage.getItem("jawan_data");
        if (jawan_data !== null) {
            setJawanData(JSON.parse(jawan_data))
        }
    }, []);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    const options = { timeZone: 'Asia/Kolkata' };
    let ISTTimestamp = new Date().toLocaleString('en-US', options);
    // ISTTimestamp = ISTTimestamp.split(", ")[1];
    console.log(ISTTimestamp)


    const markAttendence = async () => {
        const formData = {
            jawan_id: jawanData._id,
            jawan_name: jawanData.fullname,
            date: formattedDate,
            check_in_detail: ISTTimestamp,
            on_leave: 0,
        };

        const response = await fetch("http://localhost:3000/api/jawan/mark_attendence", {
            method: "POST",
            headers: {
                "authorization": localStorage.getItem("jawanAuthKey"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.status == 200) {
            response.json().then((res) => {
                alert(res.message)
                // alert("Attendence marked successfully")
                document.getElementById("check_in_btn").disabled = true
            }).catch((error) => {
                console.log(error)
            })
        }

        console.log(response)
    }

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
                                                <Link to='' className="btn btn-outline-primary mb-0">
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

                <section className="pt-0">
                    <div className="container">
                        <div className="row">
                            {/* <!-- Left sidebar START --> */}
                            <JawanSidebar />

                            {/* Right sidebar */}
                            <div className="col-xl-9">
                                <div className="atten_container mb-4 h-25  bg-primary bg-opacity-15 rounded-3">
                                    <div className="attendence_div d-flex justify-content-between align-items-center h-75">
                                        <button className='btn btn-danger w-25 mx-3'>
                                            Check Out
                                        </button>
                                        <strong className='text-black text-lg'>
                                            {new Date().toDateString()}
                                        </strong>
                                        <button type='button' onClick={markAttendence} className='btn btn-primary w-25 mx-3' id='check_in_btn'>
                                            Check In
                                        </button>
                                    </div>
                                    <div className='text-center text-blue'>
                                        <strong>
                                            Consistent attendance is the cornerstone of success. Show up, stand out, and make every day count.
                                        </strong>
                                    </div>
                                </div>
                                <Calendar />
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default JawanAttendence
