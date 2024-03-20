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
            <a className="navbar-brand" href="index-2.html">
              <img className="navbar-brand-item" src="../../public/images/logo-light.svg" alt="" />
            </a>
          </div>
          {/*<!-- Navbar brand for xl END -->*/}

          <div className="offcanvas offcanvas-start flex-row custom-scrollbar h-100" data-bs-backdrop="true" tabIndex="-1" id="offcanvasSidebar">
            <div className="offcanvas-body sidebar-content d-flex flex-column bg-dark">

              {/*<!-- Sidebar menu START -->*/}
              <ul className="navbar-nav flex-column" id="navbar-sidebar">

                {/*<!-- Menu item 1 -->*/}
                <li className="nav-item"><Link to='/admin' className="nav-link active">
                  <i className="bi bi-house fa-fw me-2"></i>Dashboard</Link></li>

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
                      <a className="nav-link" href="#">Jawan requests
                        <span className="badge text-bg-success rounded-circle ms-2">2</span>
                      </a>
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
                <li className="nav-item"> <a className="nav-link" href="admin-student-list.html">
                  <i className="fas fa-user fa-fw me-2"></i>Reserve Forces</a>
                </li>

                {/*<!-- Menu item 5 -->*/}
                <li className="nav-item"> <a className="nav-link" href="admin-review.html"><i className="far fa-comment-dots fa-fw me-2"></i>Reviews</a></li>

                {/*<!-- Menu item 6 -->*/}
                <li className="nav-item"> <a className="nav-link" href="admin-earning.html"><i className="far fa-chart-bar fa-fw me-2"></i>Earnings</a></li>

                {/*<!-- Menu item 7 -->*/}
                <li className="nav-item"> <a className="nav-link" href="admin-setting.html"><i className="fas fa-user-cog fa-fw me-2"></i>Admin Settings</a></li>

                {/*<!-- Title -->*/}
                <li className="nav-item ms-2 my-2">Documentation</li>

                {/*<!-- Menu item 10 -->*/}
                <li className="nav-item"> <a className="nav-link" href="docs/changelog.html"><i className="fas fa-sitemap fa-fw me-2"></i>Changelog</a></li>
              </ul>
              {/*<!-- Sidebar menu end -->*/}

              {/*<!-- Sidebar footer START -->*/}
              <div className="px-3 mt-auto pt-3">
                <div className="d-flex align-items-center justify-content-between text-primary-hover">
                  <a className="h5 mb-0 text-body" href="admin-setting.html" data-bs-toggle="tooltip" data-bs-placement="top" title="Settings">
                    <i className="bi bi-gear-fill"></i>
                  </a>
                  <a className="h5 mb-0 text-body" href="index-2.html" data-bs-toggle="tooltip" data-bs-placement="top" title="Home">
                    <i className="bi bi-globe"></i>
                  </a>
                  <button type='button' className="h5 mb-0 text-body" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Sign out" onClick={adminLogout}>
                    <i className="bi bi-power"></i>
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