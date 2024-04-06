import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

function Complain() {

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState();
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        c_title: "",
        c_description: "",
        c_address: "",
        c_image: ""
    });

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + Date.now()}`);
        uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrls(url);
                });
            });
    };

    const handleSubmitFormData = async (e) => {
        e.preventDefault();
        try {
            uploadFile();
            // let img = imageUrls[imageUrls.length - 1]
            console.log(imageUrls, " --> ")
            formData.c_image = imageUrls;
            console.log(formData);
            const res = await fetch('http://localhost:3000/api/user/addcomplain', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("adminAuthKey")
                },
                body: JSON.stringify(formData)
            });
            res.json().then(
                (response) => {
                    if (response.status == 200) {
                        alert(response.message)
                        // navigate('/jawanlist')
                    } else {
                        console.log(response.error.details[0].message)
                    }
                }
            ).catch((err) => console.log(err));
        } catch (error) {
            alert("Some Error Occured at Front End")
            console.log(error)
        }
    }

    return (
        <>
            <main>
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
                            {/* <div className="dropdown ms-1 ms-lg-0">
                                <a className="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img className="avatar-img rounded-circle" src={jawanData ? jawanData.profilePhoto : ""} alt="avatar" />
                                </a>
                                <ul className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
                                    <li className="px-3 mb-3">
                                        <div className="d-flex align-items-center">
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

                                    <li><Link className="dropdown-item" to="/jawan/editprofile">
                                        <i className="bi bi-person fa-fw me-2"></i>Edit Profile</Link>
                                    </li>
                                    <li><button type='button' className="dropdown-item bg-danger-soft-hover" onClick={jawanSignout}>
                                        <i className="bi bi-power fa-fw me-2"></i>Sign Out</button>
                                    </li>
                                    <li> <hr className="dropdown-divider" /></li>
                                </ul>
                            </div> */}
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
                                Add a Complain
                            </h2>
                        </div>
                    </div>
                </section>

                {/* main section */}
                <section className='main_section p-0'>
                    <div className="container">
                        <p className="text-mute shadow-sm p-2 text-center rounded-4">
                            Only add genuine complain
                        </p>
                    </div>
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
                                            <Link className='list-group-item'
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
                                            <Link className='active list-group-item'
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
                            {/* complain form */}
                            <form className="row g-4 shadow-lg rounded-3 mt-2" onSubmit={handleSubmitFormData} encType="multipart/form-data">
                                {/*<!-- Full name -->*/}
                                <div className="col-12">
                                    <label className="form-label text-black">Full name</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="fullname" placeholder="Your Full name"
                                            onChange={handleFormData} value={formData.fullname} required />
                                    </div>
                                </div>

                                {/*<!-- Email id -->*/}
                                <div className="col-md-6">
                                    <label className="form-label text-black">Email id</label>
                                    <input className="form-control" type="email" name="email" placeholder="Your Email"
                                        onChange={handleFormData} value={formData.email} required />
                                </div>

                                {/*<!-- Phone number -->*/}
                                <div className="col-md-6">
                                    <label className="form-label text-black">Phone number</label>
                                    <input type="text" className="form-control" name="phone" placeholder="Phone number"
                                        onChange={handleFormData} value={formData.phone} required />
                                </div>

                                {/*<!-- Location -->*/}
                                <div className="col-md-6">
                                    <label className="form-label text-black">Complain Location</label>
                                    <input className="form-control" type="text" name="c_address" placeholder='Complain Address'
                                        onChange={handleFormData} value={formData.c_address} required />
                                </div>

                                {/*<!-- Complain Issue -->*/}
                                <div className="col-md-6">
                                    <label className="form-label text-black">Complain Title</label>
                                    <input className="form-control" type="text" name="c_title" placeholder='Complain Title'
                                        onChange={handleFormData} value={formData.c_title} required />
                                </div>

                                {/*<!-- Complain Description -->*/}
                                <div className="col-md-12">
                                    <label className="form-label text-black">Complain Description</label>
                                    <textarea className="form-control" rows={4} name="c_detail" placeholder='Complain Description'
                                        onChange={handleFormData} value={formData.c_desctiption} required />
                                </div>

                                {/*<!-- Complain Image -->*/}
                                <div className="col-md-6">
                                    <label className="form-label text-black">Complain Image</label>
                                    <input className="form-control" type="file" name="c_image"
                                        onChange={(e) => { setImageUpload(e.target.files[0]) }} required />
                                    <span className="m-1 text-mute">Add image for proof</span>
                                </div>


                                {/*<!-- Save button -->*/}
                                <div className="d-sm-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary mb-0">Add Complain</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Complain
