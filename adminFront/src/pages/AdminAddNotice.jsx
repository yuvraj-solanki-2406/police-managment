import React, { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

function AdminAddNotice() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
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
            formData.image = imageUrls;
            const res = await fetch('http://localhost:3000/api/admin/addupdate', {
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
                        alert(response.message)
                        // navigate('/jawanlist')
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
                                <h3 className="card-header-title mb-0">Add New Notice</h3>
                            </div>
                            <div className="card-body">
                                <form className="row g-4" onSubmit={handleFormSubmit} encType="multipart/form-data">
                                    <div className="col-12">
                                        <label className="form-label">Notice Title</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="title" placeholder="Notice Title"
                                                onChange={handleFormData} value={formData.title} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Notice Description</label>
                                        <div className="input-group">
                                            <textarea className="form-control" name='description' rows={5} placeholder="Notice Description"
                                                onChange={handleFormData} value={formData.description} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Notice Image</label>
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

export default AdminAddNotice
