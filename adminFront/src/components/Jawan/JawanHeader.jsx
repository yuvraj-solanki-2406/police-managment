import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function JawanHeader() {

    document.title = "Jawan Dashboard"
    const navigate = useNavigate();
    const [jawanData, setJawanData] = useState(null)

    useEffect(() => {
        const jawan_data = localStorage.getItem("jawan_data");
        if (jawan_data !== null) {
            setJawanData(JSON.parse(jawan_data))
        }
    }, []);

    const jawanSignout = () => {
        alert("Logged out successfully")
        localStorage.removeItem("jawanAuthKey")
        localStorage.removeItem("jawan_data")
        navigate('/jawan/login')
    }

    return (
        <>
            {/* <!-- Header START --> */}
            <header className="navbar-light navbar-sticky">
                {/* <!-- Logo Nav START --> */}
                <nav className="navbar navbar-expand-xl">
                    <div className="container">
                        {/* <!-- Logo START --> */}
                        <Link className="navbar-brand" to="/">
                            <img className="light-mode-item navbar-brand-item" src="../../../public/images/logo-long.jpg" alt="logo"
                                style={{ width: "180px", height: "70px" }}
                            />
                            <img className="dark-mode-item navbar-brand-item" src="../../../public/images/logo-long.jpg" alt="logo" />
                        </Link>
                        {/* <!-- Logo END --> */}

                        {/* <!-- Responsive navbar toggler --> */}
                        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-animation">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>

                        {/* <!-- Main navbar START --> */}
                        <div className="navbar-collapse w-100 collapse" id="navbarCollapse">

                            {/* <!-- Nav Main menu START --> */}
                            <ul className="navbar-nav navbar-nav-scroll mx-auto">
                                <li className="nav-item" style={{ fontSize: "16px" }}>
                                    <Link to='/' className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item" style={{ fontSize: "16px" }}>
                                    <Link to='/community' className="nav-link">Community</Link>
                                </li>
                                <li className="nav-item" style={{ fontSize: "16px" }}>
                                    <Link to='/' className="nav-link">Services</Link>
                                </li>
                                <li className="nav-item" style={{ fontSize: "16px" }}>
                                    <Link to='/' className="nav-link">Contact</Link>
                                </li>
                            </ul>
                            {/* <!-- Nav Main menu END --> */}
                        </div>
                        {/* <!-- Main navbar END --> */}

                        {/* <!-- Profile START --> */}
                        <div className="dropdown ms-1 ms-lg-0">
                            <a className="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className="avatar-img rounded-circle" src={jawanData ? jawanData.profilePhoto : ""} alt="avatar" />
                            </a>
                            <ul className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
                                {/* <!-- Profile info --> */}
                                <li className="px-3 mb-3">
                                    <div className="d-flex align-items-center">
                                        {/* <!-- Avatar --> */}
                                        <div className="avatar me-3">
                                            <img className="avatar-img rounded-circle shadow"
                                                src={jawanData ? jawanData.profilePhoto : ""} alt="avatar" />
                                        </div>
                                        <div>
                                            <a className="h6" href="#">{jawanData ? jawanData.fullname : ""}</a>
                                            <p className="small m-0">{jawanData ? jawanData.email : ""}</p>
                                        </div>
                                    </div>
                                </li>
                                <li> <hr className="dropdown-divider" /></li>

                                {/* <!-- Links --> */}
                                <li><Link className="dropdown-item" to="/jawan/editprofile">
                                    <i className="bi bi-person fa-fw me-2"></i>Edit Profile</Link>
                                </li>
                                <li><button type='button' className="dropdown-item bg-danger-soft-hover" onClick={jawanSignout}>
                                    <i className="bi bi-power fa-fw me-2"></i>Sign Out</button>
                                </li>
                                <li> <hr className="dropdown-divider" /></li>
                            </ul>
                        </div>
                        {/* <!-- Profile END --> */}
                    </div>
                </nav>
                {/* {/* <!-- Logo Nav END --> */}
            </header>
            {/* <!-- Header END-- > */}
        </>
    )
}

export default JawanHeader
