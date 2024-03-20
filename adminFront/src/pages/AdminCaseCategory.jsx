import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

function AdminCaseCategory() {
    const [caseCate, setCaseCate] = useState([]);
    const [updateCaseCate, setupdateCaseCate] = useState({
        "_id": "",
        "title": "",
        "preference": ""
    })

    const getAllCaseCate = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/admin/case_category", {
                method: "GET",
                headers: {
                    "authorization": localStorage.getItem("adminAuthKey"),
                    "Content-type": "application/json"
                }
            });
            if (res.ok) {
                const data = await res.json()
                setCaseCate(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCaseCate();
    }, [])

    useEffect(() => {
        const table = $('#mytable').DataTable({
            data: caseCate,
            columns: [
                { title: "Title", data: "title" },
                { title: "Preference", data: "preference" },
                {
                    title: "Operations", render: function (data, type, row) {
                        return `
                        <button class="btn btn-primary btn-sm edit-btn" data-id="${row._id}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${row._id}">Delete</button>
                        `
                    }
                },
            ],
            destroy: true,
            responsive: true
        });

        // delete action
        $('#mytable').off('click', '.delete-btn').on('click', '.delete-btn', function (event) {
            event.stopPropagation()
            const id = $(this).data('id');
            let confirmed = confirm(`Are you sure you want to delete this`);
            // console.log(confirmed);
            if (confirmed) {
                deleteCaseCate(id)
            }
        });

        // Edit action
        $('#mytable').off('click', '.edit-btn').on('click', '.edit-btn', function (event) {
            event.stopPropagation();
            const id = $(this).data('id');
            getUpdateData(id);
        });

        return () => {
            // Cleanup DataTable instance
            table.destroy();
        };
    }, [caseCate]);

    // Update Case Category
    // Step 1
    const getUpdateData = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/getsinglecasecate/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("adminAuthKey")
                }
            });
            res.json().then((response) => {
                // console.log(response.data);
                setupdateCaseCate(response.data);
            });
        } catch (e) {
            console.log(e)
        }
    }
    // Step 2
    const handleUpdateFormData = (e) => {
        const { name, value } = e.target;
        setupdateCaseCate(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    // Step 3
    const submitUpdateForm = async (e) => {
        e.preventDefault();
        try {
            let id = updateCaseCate._id;
            const updateCasedetail = await fetch(`http://localhost:3000/api/admin/update_case_category/${id}`, {
                method: "PUT",
                headers: {
                    "authorization": localStorage.getItem("adminAuthKey"),
                    "Content-type": "application/json"
                },
                body: JSON.stringify(updateCaseCate)
            });
            let response = updateCasedetail.json().then((res) => {
                if (res.status == 200) {
                    getAllCaseCate();
                    alert("Data updated successfully")
                    // navigate('/cases')
                }
            })
        } catch (e) {
            console.log(`error in the code ${e}`)
        }
    }

    // Delete Category Data
    const deleteCaseCate = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/delete_case_category/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("adminAuthKey")
                }
            });
            if (response.status == 200) {
                const data = await response.json().then((res) => {
                    alert(res.message)
                    getAllCaseCate()
                });
            } else {
                alert("Failed to delete data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
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
                        {/* <!-- Title --> */}
                        <div className="row mb-3">
                            <div className="col-12 d-sm-flex justify-content-between align-items-center">
                                <h1 className="h3 mb-2 mb-sm-0">Case Category</h1>
                                <Link to="/admin/addcasecategory" className="btn btn-sm btn-primary mb-0">Add New Case Category</Link>
                            </div>
                        </div>
                        <hr />
                        <div className="card-body px-0">
                            <div className="table-responsive">
                                <table className="table border" width="100%" id='mytable'></table>
                            </div>
                        </div>

                        {/* Model for updating the case */}
                        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <form id="editForm" onSubmit={submitUpdateForm}>
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="editModalLabel">Edit Case Details</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            {/* Id */}
                                            <input type="hidden" className="form-control" id="" name="_id"
                                                onChange={handleUpdateFormData}
                                                value={updateCaseCate._id}
                                            />
                                            {/* Title */}
                                            <div className="form-group mb-3">
                                                <label htmlFor="editTitle">Title</label>
                                                <input type="text" className="form-control" id="title" name="title"
                                                    onChange={handleUpdateFormData}
                                                    value={updateCaseCate.title}
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="editTitle">Case Category</label>
                                                <input type="text" className="form-control" id="preference" name="preference"
                                                    onChange={handleUpdateFormData}
                                                    value={updateCaseCate.preference}
                                                />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary" id="saveChangesBtn">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default AdminCaseCategory
