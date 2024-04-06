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
                        <div className="navbar-expand-lg ms-auto ms-xl-0" style={{visibility: "hidden"}}>
                            {/*<!-- Toggler for menubar START -->*/}
                            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTopContent" aria-controls="navbarTopContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-animation">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                            {/*<!-- Toggler for menubar END -->*/}
                        </div>
                        {/*<!-- Top bar left END -->*/}

                        {/*<!-- Top bar right START -->*/}
                        <div className="ms-xl-auto">
                            <ul className="navbar-nav flex-row align-items-center">
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