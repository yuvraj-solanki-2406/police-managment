import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'

function AdminJawanAttendence() {
    const [dateWiseData, setDateWiseData] = useState([]);
    const [addressData, setAddressData] = useState({});

    const dateWiseAttendence = async () => {
        let today_date = new Date()
        try {
            const response = await fetch(`http://localhost:3000/api/admin/attendencestatus?curr_date=${today_date}`, {
                headers: {
                    "authorization": localStorage.getItem("adminAuthKey"),
                    "content-type": "application/json"
                },
            });

            if (response.ok) {
                response.json().then((res) => {
                    setDateWiseData(res.res);
                }).catch((err) => { console.log(err) })
            }
        } catch (error) {
            console.log(error)
        }
    };

    // const getFullAddress = async (lat, long) => {
    //     const map_api_key = '660c484f1a3be570054561dwod97972'
    //     let loc_response = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${map_api_key}`)
    //     if (loc_response.ok) {
    //         loc_response.json().then((res) => {
    //             console.log(res.display_name);
    //             return res.display_name;
    //         })
    //     }
    // }

    const getFullAddress = async (lat, long, retry = 0) => {
        const map_api_key = '660c484f1a3be570054561dwod97972';
        const endpoint = `https://geocode.maps.co/reverse.php?lat=${lat}&lon=${long}&api_key=${map_api_key}`;

        try {
            const loc_response = await fetch(endpoint);
            if (loc_response.ok) {
                const res = await loc_response.json();
                // console.log(res.display_name);
                return res.display_name;
            } else if (loc_response.status === 429 && retry < 3) {
                // Retry if rate limit exceeded
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retry)));
                return getFullAddress(lat, long, retry + 1);
            } else {
                console.error(`Failed to fetch address. Status: ${loc_response.status}`);
                return "Address not available";
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            return "Address not available";
        }
    }

    useEffect(() => {
        dateWiseAttendence()
    }, []);

    useEffect(() => {
        // Fetch addresses for each data point
        const fetchAddresses = async () => {
            const addresses = [];
            for (const entry of dateWiseData) {
                const address = await getFullAddress(entry.latitude, entry.longitude);
                addresses.push(address);
            }
            setAddressData(addresses);
        };
        fetchAddresses();
    }, [dateWiseData]);


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
                        <div className="row mb-3">
                            <div className="col-12 d-sm-flex justify-content-between align-items-center">
                                <h1 className="h3 mb-2 mb-sm-0">Jawans Attendence</h1>
                            </div>
                        </div>
                        <hr />
                        <div className="card-body px-0">
                            <h4>
                                {new Date().toDateString()}
                            </h4>
                            <div className="mt-4">
                                <table className="table table-bordered">
                                    <thead style={{ color: "black" }}>
                                        <tr>
                                            <th>Jawan Name</th>
                                            <th>Date</th>
                                            <th>Checkin Time</th>
                                            <th>Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dateWiseData ?
                                                dateWiseData.map((ele, index) =>
                                                    <tr key={index}>
                                                        <td>{ele.jawan_name}</td>
                                                        <td>{new Date(ele.date).toDateString()}</td>
                                                        <td>
                                                            {/* {new Date(ele.check_in_detail).toDateString()} &nbsp; */}
                                                            {new Date(ele.check_in_detail).toLocaleTimeString()}
                                                        </td>
                                                        {/* <td>{getFullAddress(ele.latitude, ele.longitude)}</td> */}
                                                        <td>{addressData[index]}</td>
                                                    </tr>
                                                ) :
                                                "...Loading"
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminJawanAttendence
