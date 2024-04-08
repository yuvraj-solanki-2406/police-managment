import React, { useState, useEffect, useRef } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import $ from 'jquery';


function AdminViewAllComplain() {

    const [complainData, setComplainData] = useState([]);
    const tableRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all cases
                const complainResponse = await fetch("http://localhost:3000/api/admin/allcomplains", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("adminAuthKey")
                    }
                });

                if (complainResponse.ok) {
                    complainResponse.json().then((res) => {
                        setComplainData(res.data);
                    }).catch((err) => {
                        console.log(err)
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
                data: complainData,
                columns: [
                    { title: "Fullname", data: "fullname" },
                    { title: "Email", data: "email" },
                    { title: "Phone", data: "phone" },
                    { title: "Location", data: "location" },
                    { title: "Complain Title", data: "com_title" },
                    { title: "Complain Description", data: "com_desc" },
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
    }, [complainData]);

    return (
        <>
            <main>
                <AdminSidebar />
                <div className="page-content">
                    <AdminHeader />
                    <div className="page-content-wrapper border">
                        <div className="row mb-3">
                            <div className="col-12 d-sm-flex justify-content-between align-items-center">
                                <h1 className="h3 mb-2 mb-sm-0">User Complain</h1>
                            </div>
                        </div>
                        <hr />
                        <div className="card-body px-0">
                            <div className="table-responsive">
                                <table className="table border" ref={tableRef} width="100%" id='mytable'></table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminViewAllComplain