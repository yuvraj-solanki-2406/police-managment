import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function FakeNews() {
    const [news, setNews] = useState("");
    const [prediction, setPrediction] = useState([])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/api/predictNews', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ news: news })
            });
            if (response.ok) {
                response.json().then((res) => {
                    if (res.classification == "Fake News!") {

                    }
                    setPrediction(res)
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                console.log("Some error")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <main className='mb-5'>
                <header className="navbar-light navbar-sticky">
                    <nav className="navbar navbar-expand-xl">
                        <div className="container">
                            <Link className="navbar-brand" to="/">
                                <img className="light-mode-item navbar-brand-item" src="../../../public/images/logo-long.jpg" alt="logo" />
                                <img className="dark-mode-item navbar-brand-item" src="../../../public/images/logo-long.jpg" alt="logo" />
                            </Link>

                            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-animation">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>

                            <div className="navbar-collapse w-100 collapse" id="navbarCollapse">
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
                            </div>

                            {/* Jawan Login */}
                            <div>
                                <button className='btn btn-primary'>
                                    Jawan Login
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Banner Section */}
                <section className="pt-0">
                    <div className="container-fluid px-0">
                        <div className="card bg-blue h-100px h-md-200px rounded-0"
                            style={{
                                background: 'url(http://localhost:5173/public/images/04.png) no-repeat center center',
                                backgroundSize: 'cover'
                            }}
                        >
                            <h2 className='d-flex justify-content-center text-white'
                                style={{ transform: 'translate(0%, 150%)' }}
                            >
                                Identify the Fake News
                            </h2>
                        </div>
                    </div>
                </section>

                {/* main content */}
                <section className="main_section p-0">
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
                                            <Link className='active list-group-item'
                                                to="/">
                                                <i className="bi bi-card-checklist fa-fw me-2"></i>
                                                Identify Fake News
                                            </Link>
                                            <Link className='list-group-item'
                                                to="/community">
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
                        <div className="col-12 col-md-8 ms-2">
                            {/* Prediction */}
                            <div className="prediction p-2 rounded-2">
                                {prediction.length ? (
                                    prediction.suggestions ? (
                                        <div className='fake_news'>
                                            <h5 className='text-center text-danger'>Alert it is a {prediction.classification}</h5>
                                            <p className='text-center'>Please refer these websites to get authentic information</p>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>News Channel</th>
                                                        <th>Website</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {prediction.suggestions.map((item, index) => (
                                                        <tr key={index}>
                                                            <td><a href={item[1]}>{item[0]}</a></td>
                                                            <td>{item[1]}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className='real_news'>
                                            <h5 className='text-success'>It is a {prediction.classification}</h5>
                                        </div>
                                    )
                                ) : (
                                    ""
                                )}
                            </div>

                            {/* Form */}
                            <div className="page-wrapper">
                                <form onSubmit={handleFormSubmit} className="row g-4 shadow-lg rounded-3 mt-2 pb-5 px-2">
                                    {/*<!-- News -->*/}
                                    <div className="col-md-12">
                                        <label className="form-label text-black">Enter News Article</label>
                                        <textarea className="form-control" rows={10} name="news"
                                            placeholder='Copy Paste the news article that you feel suspicious'
                                            onChange={(e) => setNews(e.target.value)} required />
                                    </div>
                                    {/*<!-- Save button -->*/}
                                    <div className="d-sm-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary mb-0">
                                            Predict News Authenticity
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default FakeNews
