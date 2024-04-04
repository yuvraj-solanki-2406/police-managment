import React, { useState, useEffect } from 'react'
import { Link, useLocation, useMatch } from 'react-router-dom'

function JawanSidebar() {
    const [active, setActive] = useState("")

    const location = useLocation()
    useEffect(() => {
        // console.log(location.pathname.split("/")[2]);
        const currRoute = location.pathname.split("/")[2];
        setActive(currRoute)
    }, [location.pathname]);

    const jawanLogout = () => {
        let jawan_data = localStorage.getItem("jawan_data");
        let jawan_auth_key = localStorage.getItem("jawanAuthKey");
        if (jawan_data && jawan_auth_key) {
            alert("Logout Successfull")
            localStorage.removeItem("jawan_data")
            localStorage.removeItem("jawanAuthKey")
            window.location.href = '/jawan/login'
        }
    }

    return (
        <>
            {/* <!-- Left sidebar START --> */}
            <div className="col-xl-3">
                {/* <!-- Responsive offcanvas body START --> */}
                <div className="offcanvas-xl offcanvas-end" tabIndex="-1" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
                    {/* <!-- Offcanvas header --> */}
                    <div className="offcanvas-header bg-light">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
                    </div>
                    {/* <!-- Offcanvas body --> */}
                    <div className="offcanvas-body p-3 p-xl-0">
                        <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                            {/* <!-- Dashboard menu --> */}
                            <div className="list-group list-group-dark list-group-borderless">
                                <Link className={active == 'dashboard' ? 'active list-group-item' : 'list-group-item'}
                                    to="/jawan/dashboard">
                                    <i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard
                                </Link>
                                <Link className={active == 'attendence' ? 'active list-group-item' : 'list-group-item'}
                                    to="/jawan/attendence">
                                    <i className="bi bi-card-checklist fa-fw me-2"></i>Attendence
                                </Link>
                                <Link className={active == 'allcases' ? 'active list-group-item' : 'list-group-item'}
                                    to='/jawan/allcases' >
                                    <i className="bi bi-basket fa-fw me-2"></i>All Cases
                                </Link>
                                <Link className={active == 'editprofile' ? 'active list-group-item' : 'list-group-item'}
                                    to='/jawan/editprofile'>
                                    <i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile
                                </Link>
                                <a className="list-group-item" href="instructor-delete-account.html">
                                    <i className="bi bi-trash fa-fw me-2"></i>Delete Profile
                                </a>
                                <button className="list-group-item text-danger bg-danger-soft-hover d-flex justifyt-content-left"
                                    onClick={jawanLogout}>
                                    <i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out
                                </button>
                                {/* <a className="list-group-item" href="student-course-resume.html">
                                    <i className="far fa-fw fa-file-alt me-2"></i>Course Resume
                                </a> */}
                                {/* <a className="list-group-item" href="student-quiz.html">
                                    <i className="bi bi-question-diamond fa-fw me-2"></i>Quiz
                                </a>
                                <a className="list-group-item" href="student-payment-info.html">
                                    <i className="bi bi-credit-card-2-front fa-fw me-2"></i>Payment info
                                </a>
                                <a className="list-group-item" href="student-bookmark.html">
                                    <i className="bi bi-cart-check fa-fw me-2"></i>Wishlist
                                </a> */}
                                {/* <a className="list-group-item" href="instructor-setting.html">
                                    <i className="bi bi-gear fa-fw me-2"></i>Settings
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Responsive offcanvas body END --> */}
            </div>
            {/* <!-- Left sidebar END --> */}
        </>
    )
}

export default JawanSidebar
