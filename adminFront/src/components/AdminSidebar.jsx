import React, { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

function AdminSidebar() {

  // console.log(useLocation().pathname);
  const navigate = useNavigate();

  const adminLogout = () => {
    const adminAuthKey = localStorage.getItem("adminAuthKey")
    if (adminAuthKey) {
      localStorage.removeItem("user_data");
      localStorage.removeItem("adminAuthKey");
      alert("Logout Successgully")
      navigate('/admin/login')
    }
  }

  return (
    <>
      <main className="sidebar_main">
        {/*<!-- Sidebar START -->*/}
        <nav className="navbar sidebar navbar-expand-xl navbar-dark bg-dark">

          {/*<!-- Navbar brand for xl START -->*/}
          <div className="d-flex align-items-center">
            <a className="navbar-brand w-100">
              <img className="navbar-brand-item" src="../../public/images/logo-long.jpg" alt="" width={'100%'} height={'100px'} />
            </a>
          </div>
          {/*<!-- Navbar brand for xl END -->*/}

          <div className="offcanvas offcanvas-start flex-row custom-scrollbar h-100" data-bs-backdrop="true" tabIndex="-1" id="offcanvasSidebar">
            <div className="offcanvas-body sidebar-content d-flex flex-column bg-dark">

              {/*<!-- Sidebar menu START -->*/}
              <ul className="navbar-nav flex-column" id="navbar-sidebar">

                {/*<!-- Menu item 1 -->*/}
                <li className="nav-item"><Link to='/admin' className="nav-link">
                  <i className="bi bi-house fa-fw me-2"></i>Dashboard</Link>
                </li>

                {/*<!-- Title -->*/}
                <li className="nav-item ms-2 my-2">Pages</li>

                {/*<!-- Menu item 4 -->*/}
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="collapse" href="#collapseinstructors" role="button"
                    aria-expanded="false"
                    aria-controls="collapseinstructors"
                  // onClick={() => toggleMenu("jawanlist")}
                  >
                    <i className="fas fa-user-tie fa-fw me-2"></i>Jawans
                  </a>
                  {/*<!-- Submenu -->*/}
                  <ul className={`nav collapse flex-column`} id="collapseinstructors" data-bs-parent="#navbar-sidebar">
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/jawanlist">Jawans</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/jawan/attendence">Jawans Attendence</Link>
                    </li>
                  </ul>
                </li>

                {/*<!-- Menu item 4 -->*/}
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="collapse" href="#collapsecases" role="button"
                    aria-expanded="fasle" aria-controls="collapsecases"
                  // onClick={() => toggleMenu("cases")}
                  >
                    <i className="far fa-clipboard fa-fw me-2"></i>Cases
                  </a>
                  {/*<!-- Submenu -->*/}
                  <ul className={`nav collapse flex-column`} id="collapsecases" data-bs-parent="#navbar-sidebar">
                    <li className="nav-item">
                      <Link to={'/admin/case_category'} className={`nav-link`}>Case Categories</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/admin/cases'} className={`nav-link`}>Manage Cases</Link>
                    </li>
                  </ul>
                </li>

                {/*<!-- Menu item 3 -->*/}
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/reserveforces">
                  <i className="fas fa-user fa-fw me-2"></i>Reserve Forces</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/notices">
                    <i className="fas fa-pen fa-fw me-2"></i>Share Notice</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/viewcomplain">
                    <i className="fas fa-user-cog fa-fw me-2"></i>User Complains</Link>
                </li>

                {/* <li className="nav-item">
                  <a className="nav-link" href="admin-review.html">
                    <i className="far fa-comment-dots fa-fw me-2"></i>Reviews</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="admin-earning.html">
                    <i className="far fa-chart-bar fa-fw me-2"></i>Earnings</a>
                </li>

                <li className="nav-item ms-2 my-2">Documentation</li>

                <li className="nav-item">
                  <a className="nav-link" href="docs/changelog.html">
                    <i className="fas fa-sitemap fa-fw me-2"></i>Changelog</a>
                </li> */}
              </ul>
              {/*<!-- Sidebar menu end -->*/}

              {/*<!-- Sidebar footer START -->*/}
              <div className="px-3 mt-auto pt-3">
                <hr />
                <div className="d-flex align-items-center justify-content-between text-primary-hover">
                  <button className="h5 mb-0 text-body btn btn-l" data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Settings">
                    <i className="bi bi-gear-fill bi-lg"></i>
                  </button>
                  <button type='button' className="h5 mb-0 text-body btn btn-l" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Sign out" onClick={adminLogout}>
                    <i className="bi bi-power bi-lg"></i>
                  </button>
                </div>
              </div>
              {/*<!-- Sidebar footer END -->*/}

            </div>
          </div>
        </nav>
        {/*<!-- Sidebar END -->*/}
      </main>
    </>
  )
}

export default AdminSidebar