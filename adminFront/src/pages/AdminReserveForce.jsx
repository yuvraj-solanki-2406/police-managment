import React, { useState, useEffect, useRef } from 'react'
import $ from 'jquery';
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { Link } from 'react-router-dom'
import { render } from 'react-dom';

function AdminReserveForce() {
    const [reserveForceData, setReserveForceData] = useState([]);
    const tableRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all cases
                const caseResponse = await fetch("http://localhost:3000/api/admin/reservepolice", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("adminAuthKey")
                    }
                });

                if (caseResponse.ok) {
                    caseResponse.json().then((res) => {
                        setReserveForceData(res.data)
                    }).catch((error) => {
                        console.log("Error ", error)
                    })
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
                data: reserveForceData.map(item => ({
                    ...item,
                    tenure_started: new Date(item.tenure_started).toDateString(),
                })),
                columns: [
                    { title: "Fullname", data: "fullname" },
                    { title: "Phone", data: "phone" },
                    { title: "Service Department", data: "department" },
                    { title: "Tenure Started", data: "tenure_started" },
                    { title: "Address", data: "address" },
                    {
                        title: "Image", render: function (data, type, row) {
                            console.log(row)
                            return row ? `
                                <img src="${row.image}" alt="${row.fullname}" class="table_image_rf">
                            ` 
                            : "No Image"
                        }
                    },
                    // {
                    //     title: "Operations", render: function (row) {
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
        };

        initializeDataTable();

        return () => {
            // Cleanup DataTable instance
            $('#mytable').DataTable().destroy();
        };
    }, [reserveForceData]);

    return (
        <>
            <main>
                <AdminSidebar />
                <div className="page-content">
                    <AdminHeader />
                    <div className="page-content-wrapper border">
                        <div className="row mb-3">
                            <div className="col-12 d-sm-flex justify-content-between align-items-center">
                                <h1 className="h3 mb-2 mb-sm-0">Reserve Force</h1>
                                <Link to="/admin/addreserve" className="btn btn-sm btn-primary mb-0">
                                    Add Reserve Force Officer
                                </Link>
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

export default AdminReserveForce