import React from 'react'
import { Link } from 'react-router-dom'

function Community() {
    const arr = [1, 2, 3, 4, 5]
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
                                arr.map((item, idx) => (
                                    <div className="single_post mb-4 border rounded-3 shadow-sm" key={idx}>
                                        <div className="card">
                                            <img className="card-img-top img_comm_card" src={`../../images/p${idx + 1}.jpg`} alt="Title" />
                                            <div className="card-body">
                                                <h4 className="card-title">Get aware of the known person near your area</h4>
                                                <p className="card-text text-dark" style={{textAlign: "justify"}}>
                                                    The certain raise in the case of theft and robbery in the colonies have
                                                    led to the disruption in the behaviour and lifestlye of the citizens, there
                                                    is nothing to worry about the robbery as MP Police is alway with the citizens
                                                    and the sole aim of Mp Police is to make the people sleep peacefully. With
                                                    increase in robbery cases, MP Police have increased the patrolling in such areas.
                                                    It is also the duty of aware citizens that they should complain about any
                                                    unusal activity in there area like some complaining about the suspicious people
                                                    who are moving in your area.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Community
