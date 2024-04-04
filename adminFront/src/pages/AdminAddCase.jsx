import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

function AdminAddCase() {

    const caseCategor = ["Murder", "Kidnapping", "Theaft", "Robbery"]
    const assignedJawan = ["Ramesh", "Suresh", "Mahesh", "Kamlesh"]
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        "title": "",
        "caseCategory": "",
        "location": "",
        "dateTime": "",
        "assignedJawan": "",
        "chargeTakenDateTime": "",
        "caseRecords": [],
        "remarks": ""
    });

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await fetch('http://localhost:3000/api/admin/addcase', {
                method: "POST",
                headers: {
                    "authorization": localStorage.getItem("adminAuthKey"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            console.log(res);
            if (res.status == 200) {
                res.json().then((response) => {
                    alert(response.message)
                })
                navigate('/admin/cases')
            }
        } catch (error) {
            console.log("Error occured in saving case details");
            console.log(error)
        }
    };

    const [jawanList, setJawanList] = useState([])
    const getAllJawans = async () => {
        const res = await fetch('http://localhost:3000/api/admin/jawans', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("adminAuthKey")
            }
        });
        res.json().then((response) => {
            setJawanList(response.data);
            // console.log(response.data)
        })
    };

    useEffect(()=>{
        getAllJawans()
    },[]);

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
                        <div className="card bg-transparent border rounded-3">
                            {/*<!-- Card header -->*/}
                            <div className="card-header bg-transparent border-bottom">
                                <h3 className="card-header-title mb-0">Add Case Details</h3>
                            </div>
                            <div className="card-body">
                                <form className='row g-4 px-2' method='POST' onSubmit={handleFormSubmit}>
                                    {/*<!-- Case Title -->*/}
                                    <div className="col-12">
                                        <label className="form-label">Case Title</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="title" placeholder="Enter Case Title" onChange={handleFormData} value={formData.title} />
                                        </div>
                                    </div>
                                    {/*<!-- Case Category -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Case Category</label>
                                        <div className="input-group">
                                            <select className='form-select' name="caseCategory" id="caseCaegory" onChange={handleFormData} value={formData.caseCategory}>
                                                <option value="" disabled defaultValue>Select Case Category</option>
                                                {
                                                    caseCategor.map((item, key) => (
                                                        <option value={item} key={key}>{item}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    {/*<!-- Case location -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Case Location</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="location" placeholder="Enter Case Location" onChange={handleFormData} value={formData.location} />
                                        </div>
                                    </div>
                                    {/*<!-- Case Date and Time -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Case Date Time</label>
                                        <div className="input-group">
                                            <input type="date" className="form-control" name="dateTime" placeholder="Enter Case Date and Time" onChange={handleFormData} value={formData.dateTime} />
                                        </div>
                                    </div>
                                    {/*<!-- Case Date and Time -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Task charged Date Time</label>
                                        <div className="input-group">
                                            <input type="date" className="form-control" name="chargeTakenDateTime" placeholder="Enter Date and Time of taking charge" onChange={handleFormData} value={formData.chargeTakenDateTime} />
                                        </div>
                                    </div>
                                    {/*<!-- Case assigned Officer -->*/}
                                    <div className="col-md-6">
                                        <label className="form-label">Assign Jawan</label>
                                        <div className="input-group">
                                            <select className='form-select' name="assignedJawan" id="assignedJawan" onChange={handleFormData} value={formData.assignedJawan}>
                                                <option value="" disabled defaultValue>Assign Jawan</option>
                                                {
                                                    jawanList.map((item, key) => (
                                                        <option value={item._id} key={key}>{item.fullname}</option>
                                                    ))
                                                }
                                            </select>
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

export default AdminAddCase
