import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function JawanLogin() {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const login_data = { email, password }

    const submitLoginForm = async (e) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/api/jawan/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login_data)
        });
        res.json().then(
            (response) => {
                if (res.status == 200) {
                    localStorage.setItem("jawanAuthKey", response.jwtToken);
                    localStorage.setItem("jawan_data", JSON.stringify(response.user_data));
                    // setAdminAuthKey(response.jwtToken);
                    navigate('/jawan/dashboard')
                } else {
                    alert(response.message.details[0].message)
                }
                let adminAuthKey = localStorage.getItem("adminAuthKey")
                if (adminAuthKey) {
                    localStorage.removeItem("adminAuthKey")
                    localStorage.removeItem("user_data")
                }
            }
        ).catch((err) => console.log(err))
    }

    useEffect(() => {
        document.title = "Jawan Login"
        let jawanAuthKey = localStorage.getItem("jawanAuthKey")
        if (jawanAuthKey != null) {
            navigate('/jawan/dashboard')
        }
    }, [])

    return (
        <>
            {/*<!-- **************** MAIN CONTENT START **************** -->*/}
            <main>
                <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
                    <div className="container-fluid">
                        <div className="row">
                            {/*<!-- left -->*/}
                            <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
                                <div className="p-3 p-lg-5">
                                    {/*<!-- Title -->*/}
                                    <div className="text-center">
                                        <h2 className="fw-bold">Jawan Login</h2>
                                        <p className="mb-0 h5 fw-light">देश भक्ति जन सेवा</p>
                                    </div>
                                    {/*<!-- SVG Image -->*/}
                                    <img src="../../public/images/logo.png" className="mt-5 login_logo_img" alt="" />
                                </div>
                            </div>

                            {/*<!-- Right -->*/}
                            <div className="col-12 col-lg-6 m-auto">
                                <div className="row my-5">
                                    <div className="col-sm-10 col-xl-8 m-auto">
                                        {/*<!-- Title -->*/}
                                        <img src="assets/images/element/03.svg" className="h-40px mb-2" alt="" />
                                        <h2>Sign in to your account!</h2>
                                        <p className="lead mb-4">Nice to see you! Please Sign in with your account.</p>

                                        {/*<!-- Form START -->*/}
                                        <form onSubmit={submitLoginForm}>
                                            {/*<!-- Email -->*/}
                                            <div className="mb-4">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email address *</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill"></i></span>
                                                    <input type="email" className="form-control border-0 bg-light rounded-end ps-1" placeholder="E-mail" id="exampleInputEmail1" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                                                </div>
                                            </div>
                                            {/*<!-- Password -->*/}
                                            <div className="mb-4">
                                                <label htmlFor="inputPassword5" className="form-label">Password *</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock"></i></span>
                                                    <input type="password" className="form-control border-0 bg-light rounded-end ps-1" placeholder="*********" id="inputPassword5" name='password' onChange={(e) => { setPassword(e.target.value) }} />
                                                </div>
                                            </div>
                                            {/*<!-- Button -->*/}
                                            <div className="align-items-center mt-0">
                                                <div className="d-grid">
                                                    <button className="btn btn-primary mb-0" type="submit" >Sign In</button>
                                                </div>
                                            </div>
                                        </form>
                                        {/*<!-- Form END -->*/}

                                        {/*<!-- Social buttons -->*/}
                                        <div className="row">
                                            {/*<!-- Divider with text -->*/}
                                            <div className="position-relative my-4">
                                                <hr />
                                                <p className="small position-absolute top-50 start-50 translate-middle bg-body px-5">Or</p>
                                            </div>
                                            {/*<!-- Social btn -->*/}
                                            <div className="col-xxl-6 d-grid">
                                                <a href="#" className="btn bg-google mb-2 mb-xxl-0"><i className="fab fa-fw fa-google text-white me-2"></i>Signup with Google</a>
                                            </div>
                                            {/*<!-- Social btn -->*/}
                                            <div className="col-xxl-6 d-grid">
                                                <a href="#" className="btn bg-facebook mb-0"><i className="fab fa-fw fa-facebook-f me-2"></i>Signup with Facebook</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/*<!-- **************** MAIN CONTENT END **************** -->*/}
        </>
    )
}

export default JawanLogin
