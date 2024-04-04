import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'datatables.net-bs5';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

function AdminCasesList() {
    const [caseData, setCaseData] = useState([]);
    const tableRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all cases
                const caseResponse = await fetch("http://localhost:3000/api/admin/cases", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("adminAuthKey")
                    }
                });

                if (caseResponse.ok) {
                    const caseData = await caseResponse.json();

                    // Fetch all jawans
                    const jawanResponse = await fetch('http://localhost:3000/api/admin/jawans', {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": localStorage.getItem("adminAuthKey")
                        }
                    });

                    if (jawanResponse.ok) {
                        const jawanData = await jawanResponse.json();
                        const jawanMap = new Map(jawanData.data.map(jawan => [jawan._id, jawan.fullname]));

                        // Update caseData with jawan names
                        const updatedCaseData = caseData.data.map(caseItem => ({
                            ...caseItem,
                            assignedJawan: jawanMap.get(caseItem.assignedJawan)
                        }));

                        setCaseData(updatedCaseData);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const initializeDataTable = () => {
            if (!tableRef.current) return;

            const table = $(tableRef.current).DataTable({
                data: caseData.map(item => ({
                    ...item,
                    dateTime: new Date(item.dateTime).toISOString().split('T')[0],
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
                            `;
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
                let confirmed = confirm(`Delete row ${id}`);
                if (confirmed) {
                    deleteCase(id);
                }
            });

            // Event delegation for handling edit action
            $('#mytable').off('click', '.edit-btn').on('click', '.edit-btn', function (event) {
                event.stopPropagation();
                const id = $(this).data('id');
                getUpdateData(id);
            });
        };

        initializeDataTable();

        return () => {
            // Cleanup DataTable instance
            $('#mytable').DataTable().destroy();
        };
    }, [caseData]);

    const deleteCase = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/deletecase/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("adminAuthKey")
                }
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                fetchData(); // Refresh case data after deletion
            } else {
                alert("Failed to delete data");
            }
        } catch (error) {
            console.error("Error deleting case:", error);
        }
    };

    const getUpdateData = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/getsinglecase/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("adminAuthKey")
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Set update case data here
                // setUpdateCaseData(data);
                // Open modal
                // $('#editModal').modal('show');
            } else {
                console.error("Failed to fetch single case data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching single case data:", error);
        }
    };

    return (
        <main>
            <AdminSidebar />
            <div className="page-content">
                <AdminHeader />
                <div className="page-content-wrapper border">
                    <div className="row mb-3">
                        <div className="col-12 d-sm-flex justify-content-between align-items-center">
                            <h1 className="h3 mb-2 mb-sm-0">Case List</h1>
                            <Link to="/admin/addcase" className="btn btn-sm btn-primary mb-0">Add New Case</Link>
                        </div>
                    </div>
                    <hr />
                    <div className="card-body px-0">
                        <div className="table-responsive">
                            <table className="table border" width="100%" ref={tableRef} id='mytable'></table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminCasesList;
