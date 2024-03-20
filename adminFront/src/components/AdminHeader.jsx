import React, { useState, useEffect } from 'react'
import { json, Link, useNavigate } from 'react-router-dom';

function AdminHeader() {

    const navigate = useNavigate();

    const checkAuth = () => {
        const adminAuthKey = localStorage.getItem('adminAuthKey')
        return adminAuthKey ? true : false;
    }
    const getNavClasses = () => {
        const isAuthenticated = checkAuth();
        const baseClass = 'nav-item ms-2 ms-md-3 dropdown';
        return isAuthenticated ? `${baseClass}` : `${baseClass} d-none m-2`;
    };
    const hideLoginButton = () => {
        const isAuthenticated = checkAuth();
        const baseClass = 'nav-item ms-2 ms-md-3 dropdown';
        return isAuthenticated ? `${baseClass} d-none` : 'ms-2'
    }

    const [userData, setUserData] = useState()
    useEffect(() => {
        const user_data = localStorage.getItem("user_data")
        if (user_data) {
            setUserData(JSON.parse(user_data))
        }
    }, []);

    const adminLogout = () => {
        const adminAuthKey = localStorage.getItem("adminAuthKey")
        if (adminAuthKey) {
            localStorage.removeItem("user_data");
            localStorage.removeItem("adminAuthKey");
            alert("Logout Successgully")
            navigate('/admin/login')
        }
    }

    return (
        <>
            {/*<!-- Top bar START -->*/}
            <nav className="navbar top-bar navbar-light border-bottom py-0 py-xl-3">
                <div className="container-fluid p-0">
                    <div className="d-flex align-items-center w-100">
                        {/*<!-- Logo START -->*/}
                        <div className="d-flex align-items-center d-xl-none">
                            <a className="navbar-brand" href="index-2.html">
                                <img className="light-mode-item navbar-brand-item h-30px" src="assets/images/logo-mobile.svg" alt="" />
                                <img className="dark-mode-item navbar-brand-item h-30px" src="assets/images/logo-mobile-light.svg" alt="" />
                            </a>
                        </div>
                        {/*<!-- Logo END -->*/}

                        {/*<!-- Toggler for sidebar START -->*/}
                        <div className="navbar-expand-xl sidebar-offcanvas-menu">
                            <button className="navbar-toggler me-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar" aria-expanded="false" aria-label="Toggle navigation" data-bs-auto-close="outside">
                                <i className="bi bi-text-right fa-fw h2 lh-0 mb-0 rtl-flip" data-bs-target="#offcanvasMenu"> </i>
                            </button>
                        </div>
                        {/*<!-- Toggler for sidebar END -->*/}

                        {/*<!-- Top bar left -->*/}
                        <div className="navbar-expand-lg ms-auto ms-xl-0">

                            {/*<!-- Toggler for menubar START -->*/}
                            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTopContent" aria-controls="navbarTopContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-animation">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                            {/*<!-- Toggler for menubar END -->*/}

                            {/*<!-- Topbar menu START -->*/}
                            <div className="collapse navbar-collapse w-100" id="navbarTopContent">
                                {/*<!-- Top search START -->*/}
                                <div className="nav my-3 my-xl-0 flex-nowrap align-items-center">
                                    <div className="nav-item w-100">
                                        <form className="position-relative">
                                            <input className="form-control pe-5 bg-secondary bg-opacity-10 border-0" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="bg-transparent px-2 py-0 border-0 position-absolute top-50 end-0 translate-middle-y" type="submit"><i className="fas fa-search fs-6 text-primary"></i></button>
                                        </form>
                                    </div>
                                </div>
                                {/*<!-- Top search END -->*/}
                            </div>
                            {/*<!-- Topbar menu END -->*/}
                        </div>
                        {/*<!-- Top bar left END -->*/}

                        {/*<!-- Top bar right START -->*/}
                        <div className="ms-xl-auto">
                            <ul className="navbar-nav flex-row align-items-center">

                                {/*<!-- Notification dropdown START -->*/}
                                <li className="nav-item ms-2 ms-md-3 dropdown">
                                    {/*<!-- Notification button -->*/}
                                    <a className="btn btn-light btn-round mb-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                        <i className="bi bi-bell fa-fw"></i>
                                    </a>
                                    {/*<!-- Notification dote -->*/}
                                    <span className="notif-badge animation-blink"></span>

                                    {/*<!-- Notification dropdown menu START -->*/}
                                    <div className="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0">
                                        <div className="card bg-transparent">
                                            <div className="card-header bg-transparent border-bottom py-4 d-flex justify-content-between align-items-center">
                                                <h6 className="m-0">Notifications <span className="badge bg-danger bg-opacity-10 text-danger ms-2">2 new</span></h6>
                                                <a className="small" href="#">Clear all</a>
                                            </div>
                                            <div className="card-body p-0">
                                                <ul className="list-group list-unstyled list-group-flush">
                                                    {/*<!-- Notif item -->*/}
                                                    <li>
                                                        <a href="#" className="list-group-item-action border-0 border-bottom d-flex p-3">
                                                            <div className="me-3">
                                                                <div className="avatar avatar-md">
                                                                    <img className="avatar-img rounded-circle" src="assets/images/avatar/08.jpg" alt="avatar" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-body small m-0">Congratulate <b>Joan Wallace</b> for graduating from <b>Microverse university</b></p>
                                                                <u className="small">Say congrats</u>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    {/*<!-- Notif item -->*/}
                                                    <li>
                                                        <a href="#" className="list-group-item-action border-0 border-bottom d-flex p-3">
                                                            <div className="me-3">
                                                                <div className="avatar avatar-md">
                                                                    <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt="avatar" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-1">Larry Lawson Added a new course</h6>
                                                                <p className="small text-body m-0">What's new! Find out about new features</p>
                                                                <u className="small">View detail</u>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    {/*<!-- Notif item -->*/}
                                                    <li>
                                                        <a href="#" className="list-group-item-action border-0 border-bottom d-flex p-3">
                                                            <div className="me-3">
                                                                <div className="avatar avatar-md">
                                                                    <img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg" alt="avatar" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-1">New request to apply for Instructor</h6>
                                                                <u className="small">View detail</u>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    {/*<!-- Notif item -->*/}
                                                    <li>
                                                        <a href="#" className="list-group-item-action border-0 border-bottom d-flex p-3">
                                                            <div className="me-3">
                                                                <div className="avatar avatar-md">
                                                                    <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt="avatar" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-1">Update v2.3 completed successfully</h6>
                                                                <p className="small text-body m-0">What's new! Find out about new features</p>
                                                                <small className="text-body">5 min ago</small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/*<!-- Button -->*/}
                                            <div className="card-footer bg-transparent border-0 py-3 text-center position-relative">
                                                <a href="#" className="stretched-link">See all incoming activity</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!-- Notification dropdown menu END -->*/}
                                </li>
                                {/*<!-- Notification dropdown END -->*/}

                                {/* Login Button */}
                                <li className={hideLoginButton()}>
                                    <Link to='/login' className="btn btn-primary">
                                        Login
                                    </Link>
                                </li>
                                {/*<!-- Profile dropdown START -->*/}
                                <li className={getNavClasses()}>
                                    <a className="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="avatar" />
                                    </a>

                                    {/*<!-- Profile dropdown START -->*/}
                                    <ul className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
                                        {/*<!-- Profile info -->*/}
                                        <li className="px-3">
                                            <div className="d-flex align-items-center">
                                                {/*<!-- Avatar -->*/}
                                                <div className="avatar me-3 mb-3">
                                                    <img className="avatar-img rounded-circle shadow" src="assets/images/avatar/01.jpg" alt="avatar" />
                                                </div>
                                                <div>
                                                    <a className="h6 mt-2 mt-sm-0" href="#">{userData ? userData.name : ""}</a>
                                                    <p className="small m-0">{userData ? userData.email : " "}</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li> <hr className="dropdown-divider" /></li>
                                        {/*<!-- Links -->*/}
                                        <li><a className="dropdown-item" href="#">
                                            <i className="bi bi-person fa-fw me-2"></i>Edit Profile</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item bg-danger-soft-hover" onClick={adminLogout}>
                                                <i className="bi bi-power fa-fw me-2"></i>Sign Out</a>
                                        </li>
                                        <li> <hr className="dropdown-divider" /></li>

                                        {/*<!-- Dark mode switch START -->*/}
                                        <li>
                                            <div className="modeswitch-wrap" id="darkModeSwitch">
                                                <div className="modeswitch-item">
                                                    <div className="modeswitch-icon"></div>
                                                </div>
                                                <span>Dark mode</span>
                                            </div>
                                        </li>
                                        {/*<!-- Dark mode switch END -->*/}
                                    </ul>
                                    {/*<!-- Profile dropdown END -->*/}
                                </li>
                                {/*<!-- Profile dropdown END -->*/}
                            </ul>
                        </div>
                        {/*<!-- Top bar right END -->*/}
                    </div>
                </div>
            </nav>
            {/*<!-- Top bar END -->*/}
        </>
    )
}

export default AdminHeader