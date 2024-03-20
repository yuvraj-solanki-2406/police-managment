import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';


function AdminAddJawan() {
    const navigate = useNavigate();
    const [togglePassword, setTogglePassword] = useState("password");

    const showHidePassword = () => {
        const newType = (togglePassword === "password" ? "text" : "password");
        setTogglePassword(newType);
    };

    const [formData, setFormData] = useState({
        fullname: "",
        // username: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        addharCard: "",
        solvedCases: "",
        pendingCases: "",
        totalCases: "",
        profilePhoto: ""
    });

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitFormData = async (e) => {
        e.preventDefault();
        if (formData.fullname != "" && formData.email != "" &&
            formData.password != "" && formData.phone != "" &&
            formData.address != "" && formData.addharCard != "" &&
            formData.profilePhoto != ""
        ) {
            formData.totalCases = parseInt(formData.pendingCases) + parseInt(formData.solvedCases)
            console.log(formData);
            try {
                const res = await fetch('http://localhost:3000/api/admin/addjawan', {
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
        } else {
            alert(`fill the data`)
        }
    }

    return (
        <>
            <main>
                {/* Admin Adiebar */}
                <AdminSidebar />
                <div className="page-content">
                    {/* Admin Header */}
                    <AdminHeader />

                    {/* Page Content Start */}
                    <div className="page-content-wrapper border">
                        {/*<!-- Edit profile START -->*/}
                        <div className="card bg-transparent border rounded-3">
                            {/*<!-- Card header -->*/}
                            <div className="card-header bg-transparent border-bottom">
                                <h3 className="card-header-title mb-0">Add New Jawan</h3>
                            </div>
                            {/*<!-- Card body START -->*/}
                            <div className="card-body">
                                {/*<!-- Form -->*/}
                                <form className="row g-4" onSubmit={handleSubmitFormData} encType="multipart/form-data">
                                    {/*<!-- Profile picture -->*/}
                                    <div className="col-12 justify-content-center align-items-center">
                                        <label className="form-label">Profile picture</label>
                                        <div className="d-flex align-items-center">
                                            <label className="position-relative me-4" htmlFor="uploadfile-1" title="Replace this pic">
                                                {/*<!-- Avatar place holder -->*/}
                                                <span className="avatar avatar-xl">
                                                    <img id="uploadfile-1-preview" className="avatar-img rounded-circle border border-white border-3 shadow" src="assets/images/avatar/07.jpg" alt="" />
                                                </span>
                                                {/*<!-- Remove btn -->*/}
                                                <button type="button" className="uploadremove"><i className="bi bi-x text-white"></i></button>
                                            </label>
                                            {/*<!-- Upload button -->*/}
                                            <label className="btn btn-primary-soft mb-0" htmlFor="uploadfile-1">Change</label>
                                            <input id="uploadfile-1" name='profilePhoto' className="form-control d-none" type="file" onChange={handleFormData} />
                                        </div>
                                    </div>

                                    {/*<!-- Full name -->*/}
                                    <div className="col-12">
                                        <label className="form-label">Full name</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="fullname" placeholder="Full name" onChange={handleFormData} value={formData.fullname} />
                                            {/* <input type="text" className="form-control" name="last_name" placeholder="Last name" /> */}
                                        </div>
                                    </div>

                                    {/*<!-- Username -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Username</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="username" placeholder='Username' />
                                        </div>
                                    </div>

                                    {/*<!-- Email id -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Email id</label>
                                        <input className="form-control" type="email" name="email" placeholder="Email" onChange={handleFormData} value={formData.email} />
                                    </div>

                                    {/*<!-- Password -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Temporary Passwrod</label>
                                        <div className="input-group">
                                            <input className="form-control" type={togglePassword} name='password' placeholder="Enter Temporary Passwrod" onChange={handleFormData} value={formData.password} />
                                            <a onClick={showHidePassword} className="input-group-text p-0 bg-transparent">
                                                <i className="far fa-eye cursor-pointer p-2 w-40px"></i>
                                            </a>
                                        </div>
                                    </div>

                                    {/*<!-- Phone number -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Phone number</label>
                                        <input type="text" className="form-control" name="phone" placeholder="Phone number" onChange={handleFormData} value={formData.phone} />
                                    </div>

                                    {/*<!-- Location -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Location</label>
                                        <input className="form-control" type="text" name="address" placeholder='Address' onChange={handleFormData} value={formData.address} />
                                    </div>

                                    {/*<!-- Adhar Card -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Addhar Card</label>
                                        <input className="form-control" type="text" name="addharCard" placeholder='Adhar Card' onChange={handleFormData} value={formData.addharCard} />
                                    </div>

                                    {/*<!-- Solved Cases -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Solved Cases</label>
                                        <input className="form-control" type="text" name="solvedCases" placeholder='Solved Cases' onChange={handleFormData} value={formData.solvedCases} />
                                    </div>

                                    {/*<!-- Pending Cases -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Pending Cases</label>
                                        <input className="form-control" type="text" name="pendingCases" placeholder='Pending Cases' onChange={handleFormData} value={formData.pendingCases} />
                                    </div>

                                    {/*<!-- Save button -->*/}
                                    <div className="d-sm-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary mb-0">Save changes</button>
                                    </div>
                                </form>
                            </div>
                            {/*<!-- Card body END -->*/}
                        </div>
                        {/*<!-- Edit profile END -->*/}
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminAddJawan
