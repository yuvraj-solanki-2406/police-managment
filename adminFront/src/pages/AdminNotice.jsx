import React, { useEffect, useState, useRef } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { Link } from 'react-router-dom'
import $ from 'jquery';


function AdminNotice() {
    const [notices, setNotices] = useState([]);
    const tableRef = useRef();

    useEffect(() => {
        const getAllNotices = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/admin/updates", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "authorization": localStorage.getItem("adminAuthKey")
                    },
                });
                if (response.ok) {
                    response.json().then((res) => {
                        setNotices(res);
                        console.log(res)
                    }).catch((err) => {
                        console.log(err)
                    })
                };
            } catch (error) {
                console.log(error)
            }
        }

        getAllNotices();
    }, []);

    useEffect(() => {
        const initializeDataTable = () => {
            if (!tableRef.current) return;

            const table = $(tableRef.current).DataTable({
                data: notices.data,
                columns: [
                    { title: "Title", data: "title" },
                    { title: "Description", data: "description" },
                    {
                        title: "Image", render: function (row) {
                            return `
                            <img src="${row}" alt="${row}">
                        `
                        }
                    },
                    { title: "Comments", data: "comments" },
                    // {
                    //     title: "Operations", render: function (data, type, row) {
                    //         return `
                    //             <button class="btn btn-primary btn-sm edit-btn" data-id="${row._id}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                    //             <button class="btn btn-danger btn-sm delete-btn" data-id="${row._id}">Delete</button>
                    //         `;
                    //     }
                    // },
                ],
                destroy: true,
                responsive: true
            });
        }

        initializeDataTable();

        return () => {
            // Cleanup DataTable instance
            $('#mytable').DataTable().destroy();
        };
    }, [notices])


    return (
        <>
            <main>
                {/* Admin Adiebar */}
                <AdminSidebar />

                <div className="page-content">
                    {/* Admin Header */}
                    <AdminHeader />

                    <div className="page-content-wrapper border">
                        <div className="row mb-3">
                            <div className="col-12 d-sm-flex justify-content-between align-items-center">
                                <h1 className="h3 mb-2 mb-sm-0">Informative Notices</h1>
                                <Link to="/admin/addnotice" className="btn btn-sm btn-primary mb-0">Add New Notice</Link>
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
        </>
    )
}

export default AdminNotice
