import React, { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminAddReserveForce() {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        tenure_started: "",
        department: "",
        image: ""
    });

    const [imageUrls, setImageUrls] = useState();
    const [imageUpload, setImageUpload] = useState(null);

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            uploadFile();
            // let img = imageUrls[imageUrls.length - 1]
            console.log(imageUrls, " --> ")
            formData.image = imageUrls ? imageUrls : null;
            const res = await fetch('http://localhost:3000/api/admin/addreservepolice', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("adminAuthKey")
                },
                body: JSON.stringify(formData)
            });
            res.json().then(
                (response) => {
                    if (res.ok) {
                        // alert(response.message)
                        toast.success(response.message)
                    } else {
                        console.log(response.error)
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
                {/* Admin Sidebar */}
                <AdminSidebar />
                <div className="page-content">
                    {/* Admin Header */}
                    <AdminHeader />

                    {/* Page Content Start */}
                    <div className="page-content-wrapper border">
                        <div className="card bg-transparent border rounded-3">
                            <div className="card-header bg-transparent border-bottom">
                                <h3 className="card-header-title mb-0">Add Reserve Force Jawan</h3>
                            </div>
                            <div className="card-body">
                                <form className="row g-4" onSubmit={handleFormSubmit} encType="multipart/form-data">
                                    <div className="col-6">
                                        <label className="form-label">Name</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="fullname" placeholder="Enter Fullname"
                                                onChange={handleFormData} value={formData.fullname} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Phone</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="phone" placeholder="Enter Phone Number"
                                                onChange={handleFormData} value={formData.phone} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Email</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="email" placeholder="Enter Email"
                                                onChange={handleFormData} value={formData.email} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Residential Address</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="address" placeholder="Enter Residential Address"
                                                onChange={handleFormData} value={formData.address} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Service Tenure Started</label>
                                        <div className="input-group">
                                            <input type="date" className="form-control" name="tenure_started" placeholder="Service Tenure Started"
                                                onChange={handleFormData} value={formData.tenure_started} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label">Service Department</label>
                                        <div className="input-group">
                                            <select name="department" className='form-select' onChange={handleFormData} value={formData.department}>
                                                <option value="IT">IT</option>
                                                <option value="Crime Branch">Crime Branch</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Jawan Image</label>
                                        <div className="input-group">
                                            <input type="file" className="form-control"
                                                onChange={(e) => setImageUpload(e.target.files[0])} />
                                        </div>
                                    </div>
                                    {/*<!-- Save button -->*/}
                                    <div className="d-sm-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary mb-0">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminAddReserveForce