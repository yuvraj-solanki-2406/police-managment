import React, { useEffect, useState } from 'react'
import { Navigate, Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import AdminCasesList from './pages/AdminCasesList'
import AdminHome from './pages/AdminHome'
import AdminLogin from './pages/AdminLogin'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'
import AdminJawanList from './pages/AdminJawanList'
import AdminAddJawan from './pages/AdminAddJawan'
import AdminAddCase from './pages/AdminAddCase'
import AdminCaseCategory from './pages/AdminCaseCategory'
import AdminAddCaseCategory from './pages/AdminAddCaseCategory'
import HomePage from './pages/common/HomePage'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';


function App() {
  // const navigate = useNavigate()
  // const [adminAuthKey, setAdminAuthKey] = useState();

  // useEffect(() => {
  //   let adminAuthKey = localStorage.getItem('adminAuthKey')
  //   if (adminAuthKey == null) {
  //     navigate('/admin/login');
  //   }

  //   // Delete admin auth key from local Storage
  //   // if (adminAuthKey != null) {
  //   //   navigate('/')
  //   // }
  //   // const deleteAuthKey = () => {
  //   //   localStorage.removeItem("adminAuthKey");
  //   //   setAdminAuthKey(null);
  //   // }
  //   // let inactivityTimer;
  //   // const resetAdminAuthTimer = () => {
  //   //   clearTimeout(inactivityTimer);
  //   //   inactivityTimer = setTimeout(deleteAuthKey, 5 * 60 * 60 * 1000);
  //   //   // navigate('/login')
  //   // };
  //   // // Event listeners to track user activity
  //   // const events = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'];
  //   // events.forEach(event => {
  //   //   window.addEventListener(event, resetAdminAuthTimer);
  //   // });
  //   // resetAdminAuthTimer();

  //   // return () => {
  //   //   events.forEach(event => {
  //   //     window.removeEventListener(event, resetAdminAuthTimer);
  //   //   });
  //   // };

  // }, [navigate]);

  return (
    <>

      {/* Page Contents */}
      <Routes>
        <Route path='/' element={<HomePage />}></Route>

        {/* Jawan Routes */}
        <Route path='jawan'>
          <Route path='login' element={<AdminLogin user_type='jawan' />}></Route>
        </Route>

        {/* Admin Routes */}
        <Route path='/admin'>
          <Route path='/admin' element={<AdminHome />}></Route>
          <Route path='login' element={<AdminLogin user_type='admin' />}></Route>
          <Route path='case_category' element={<AdminCaseCategory />}></Route>
          <Route path='addcasecategory' element={<AdminAddCaseCategory />}></Route>
          <Route path='cases' element={<AdminCasesList />}></Route>
          <Route path='addcase' element={<AdminAddCase />}></Route>
          <Route path='jawanlist' element={<AdminJawanList />}></Route>
          <Route path='addjawan' element={<AdminAddJawan />}></Route>
        </Route>
      </Routes>

    </>
  )
}

export default App
