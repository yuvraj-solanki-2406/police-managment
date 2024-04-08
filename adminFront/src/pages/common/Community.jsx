import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Community() {
    const arr = [1, 2, 3, 4, 5]
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const getAllNotices = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/user/notices", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "authorization": localStorage.getItem("adminAuthKey")
                    },
                });
                if (response.ok) {
                    response.json().then((res) => {
                        setNotices(res.data);
                        console.log(JSON.stringify(res.data))
                    }).catch((err) => {
                        console.log(err)
                    })
                };
            } catch (error) {
                console.log(error)
            }
        }

        getAllNotices();
    }, []);

    return (
        <>
            <main>
                {/* header */}
                <header className='row home_header'>
                    <nav className='col-8 home_nav'>
                        <img src="../../public/images/logo (2).png" alt="Logo" className='logo_img_home' />
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><Link to="/community">Community</Link></li>
                        </ul>
                    </nav>
                    <div className="search-bar col-4">
                        <Link to="/jawan/login" className='btn btn-secondary bg-white text-dark border shadow'>
                            Jawan Login
                        </Link>
                    </div>
                </header>

                {/* main section */}
                <section className="main_content">
                    <div className="row">
                        <div className="d-none d-sm-block col-sm-3 ms-0 ms-sm-5 mx-2 contain-fluid comm_left_side">
                            <div className="offcanvas-xl offcanvas-end" tabIndex="-1" id="offcanvasSidebarCommunity"
                                aria-labelledby="offcanvasSidebarLabelCommunity">
                                {/* <!-- Offcanvas header --> */}
                                <div className="offcanvas-header bg-light">
                                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Community Links</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                        data-bs-target="#offcanvasSidebarCommunity" aria-label="Close"></button>
                                </div>
                                {/* <!-- Offcanvas body --> */}
                                <div className="offcanvas-body p-3 p-xl-0">
                                    <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                                        {/* <!-- Dashboard menu --> */}
                                        <h5 className='text-white'>Community Links</h5>
                                        <hr />
                                        <div className="list-group list-group-dark list-group-borderless">
                                            <Link className='list-group-item'
                                                to="/">
                                                <i className="bi bi-house fa-fw me-2"></i>Home
                                            </Link>
                                            <Link className='list-group-item'
                                                to="/fakenews">
                                                <i className="bi bi-card-checklist fa-fw me-2"></i>
                                                Identify Fake News
                                            </Link>
                                            <Link className='active list-group-item'
                                                to="/">
                                                <i className="bi bi-pen fa-fw me-2"></i>
                                                Updates
                                            </Link>
                                            <Link className='list-group-item'
                                                to='/jawan/allcases' >
                                                <i className="bi bi-map fa-fw me-2"></i>
                                                Crimes at your area
                                            </Link>
                                            <Link className='list-group-item'
                                                to='/jawan/editprofile'>
                                                <i className="bi bi-mic fa-fw me-2"></i>
                                                Identify Hate Speech
                                            </Link>
                                            <Link className='list-group-item'
                                                to='/complain'>
                                                <i className="bi bi-file fa-fw me-2"></i>
                                                Add a Complain
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 ms-2 container">
                            {
                                notices.length > 1 ?
                                    notices.map((item, idx) => (
                                        <div className="single_post mb-4 border rounded-3 shadow-sm" key={idx}>
                                            <div className="card">
                                                <img className="card-img-top img_comm_card" src={item.image} alt="Title" />
                                                <div className="card-body">
                                                    <h4 className="card-title">{item.title}</h4>
                                                    <p className="card-text text-dark" style={{ textAlign: "justify" }}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <p className='loadingData text-center'>...Loading</p>
                            }
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Community
