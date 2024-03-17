import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'datatables.net-bs5'
import $ from 'jquery'
import { Link, useNavigate } from 'react-router-dom';

function AdminCasesList(props) {
    const navigate = useNavigate()
    const [caseData, setCaseData] = useState([]);
    const [updateCaseData, setUpdateCaseData] = useState({
        "_id": "",
        "title": "",
        "caseCategory": "",
        "location": "",
        "dateTime": "",
        "assignedJawan": "",
        "chargeTakenDateTime": "",
        "caseRecords": [],
        "remarks": ""
    })
    const tableRef = useRef();

    // Get all the case list
    const getAllCases = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/admin/cases", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("adminAuthKey")
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCaseData(data.data);
            } else {
                console.error("Failed to fetch data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAllCases();
    }, []);

    useEffect(() => {
        const table = $('#mytable').DataTable({
            data: caseData.map(item => ({
                ...item,
                dateTime: new Date(item.dateTime).toISOString().split('T')[0]
            })),
            columns: [
                { title: "Title", data: "title" },
                { title: "Location", data: "location" },
                { title: "Case Category", data: "caseCategory" },
                { title: "Date", data: "dateTime" },
                { title: "Assigned Jawan", data: "assignedJawan" },
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

        // Event delegation for handling delete action
        $('#mytable').off('click', '.delete-btn').on('click', '.delete-btn', function (event) {
            event.stopPropagation()
            const id = $(this).data('id');
            let confirmed = confirm(`delete row ${id}`);
            // console.log(confirmed);
            if (confirmed) {
                deleteCase(id)
            }
        });

        // Event delegation for handling edit action
        $('#mytable').off('click', '.edit-btn').on('click', '.edit-btn', function (event) {
            event.stopPropagation();
            const id = $(this).data('id');
            getUpdateData(id);

            // fillCaseUpdateModal();
        });

        return () => {
            // Cleanup DataTable instance
            table.destroy();
        };
    }, [caseData]);

    // Delete Case
    const deleteCase = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/deletecase/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("adminAuthKey")
                }
            });
            if (response.status == 200) {
                const data = await response.json().then((res) => {
                    alert(res.message)
                    getAllCases()
                });
            } else {
                alert("Failed to delete data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        console.log(caseData)
    }

    // Update Data
    // Step 1 - get data for the particular ID
    const getUpdateData = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/getsinglecase/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("adminAuthKey")
                }
            });
            res.json().then((response) => {
                // console.log(response.data);
                setUpdateCaseData(response.data);
            });
        } catch (e) {
            console.log(e)
        }
    }

    // Step 2 - fill the modal with the data
    const handleUpdateFormData = (e) => {
        const { name, value } = e.target;
        setUpdateCaseData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdateForm = async (e) => {
        e.preventDefault();
        try {
            let id = updateCaseData._id;
            const updateCasedetail = await fetch(`http://localhost:3000/api/admin/updatecase/${id}`, {
                method: "PUT",
                headers: {
                    "authorization": localStorage.getItem("adminAuthKey"),
                    "Content-type": "application/json"
                },
                body: JSON.stringify(updateCaseData)
            });
            let response = updateCasedetail.json().then((res) => {
                if (res.status == 200) {
                    getAllCases();
                    alert("Data updated successfully")
                    // navigate('/cases')
                }
            })
        } catch (e) {
            console.log(`error in the code ${e}`)
        }
    }

    const formatDate = (date) => {
        return date
        // return new Date(date).toISOString().split('T')[0]
    }

    return (
        <>
            <div className="row mb-3">
                <div className="col-12 d-sm-flex justify-content-between align-items-center">
                    <h1 className="h3 mb-2 mb-sm-0">Case List</h1>
                    <Link to="/admin/addcase" className="btn btn-sm btn-primary mb-0">Add New Case</Link>
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
                        <form id="editForm" onSubmit={handleUpdateForm}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="editModalLabel">Edit Case Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Id */}
                                <input type="hidden" className="form-control" id="" name="_id"
                                    onChange={handleUpdateFormData}
                                    value={updateCaseData._id}
                                />
                                {/* Title */}
                                <div className="form-group mb-3">
                                    <label htmlFor="editTitle">Title</label>
                                    <input type="text" className="form-control" id="title" name="title"
                                        onChange={handleUpdateFormData}
                                        value={updateCaseData.title}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="editTitle">Case Category</label>
                                    <input type="text" className="form-control" id="caseCategory" name="caseCategory"
                                        onChange={handleUpdateFormData}
                                        value={updateCaseData.caseCategory}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="editTitle">Case Location</label>
                                    <input type="text" className="form-control" id="caseLocation" name="caseLocation"
                                        onChange={handleUpdateFormData}
                                        value={updateCaseData.location}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="editTitle">Case Date Time</label>
                                    <input type="text" className="form-control" id="caseDateTime" name="caseDateTime"
                                        onChange={handleUpdateFormData}
                                        value={formatDate(updateCaseData.dateTime)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="editTitle">Task charged Date Time</label>
                                    <input type="text" className="form-control" id="chargedDT" name="chargedDT"
                                        onChange={handleUpdateFormData}
                                        value={(updateCaseData.chargeTakenDateTime)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="editTitle">Assign Jawan</label>
                                    <input type="text" className="form-control" id="assignedJawan" name="assignedJawan"
                                        onChange={handleUpdateFormData}
                                        value={updateCaseData.assignedJawan}
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

        </>
    );
}

export default AdminCasesList;
