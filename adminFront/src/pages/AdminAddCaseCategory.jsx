import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminAddCaseCategory() {
    const navigate = useNavigate();
    const categoryPref = ["High", "Medium", "Low"]
    const [formData, setFormData] = useState({
        "title": "",
        "preference": ""
    });

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await fetch('http://localhost:3000/api/admin/add_case_category', {
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
                navigate('/admin/case_category')
            }
        } catch (error) {
            console.log("Error occured in saving case details");
            console.log(error)
        }
    }

    return (
        <>
            <div className="card bg-transparent border rounded-3">
                {/*<!-- Card header -->*/}
                <div className="card-header bg-transparent border-bottom">
                    <h3 className="card-header-title mb-0">Add Case Category Details</h3>
                </div>
                <div className="card-body">
                    <form className='row g-4 px-2' method='POST' onSubmit={handleFormSubmit}>
                        {/*<!-- Case Category Title -->*/}
                        <div className="col-12">
                            <label className="form-label">Case Title</label>
                            <div className="input-group">
                                <input type="text" className="form-control" name="title"
                                    placeholder="Murder, Kidnap, etc" onChange={handleFormData}
                                    value={formData.title} />
                            </div>
                        </div>
                        {/*<!-- Case Category Preference -->*/}
                        <div className="col-12">
                            <label className="form-label">Case Category Preference</label>
                            <div className="input-group">
                                <select className='form-select' name="preference" id="preference"
                                    onChange={handleFormData} value={formData.preference}>
                                    <option value="" disabled defaultValue>Select Case Category Preference</option>
                                    {
                                        categoryPref.map((item, key) => (
                                            <option value={item} key={key}>{item}</option>
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
        </>
    )
}

export default AdminAddCaseCategory
