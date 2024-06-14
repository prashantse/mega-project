import React, { Suspense } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function Layout() {
  const location = useLocation();
  
  // Paths where the Header should not be visible
  const hideHeaderPaths = ['/login', '/register','/register/superadmin','/superadminhome','/add-employee'];
   
  return (
    <>
      {/* Conditionally render Header based on current path */}
      <Suspense fallback={"...Loading"}>

      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Outlet />
      {!hideHeaderPaths.includes(location.pathname) && <Footer />}
      </Suspense>
    </>
  );
}

export default Layout;