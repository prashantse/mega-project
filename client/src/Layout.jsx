import React, { Suspense , useEffect} from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useNavigate, Link } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  
  // Paths where the Header should not be visible
  const hideHeaderPaths = ['/login', '/register','/register/superadmin','/superadminhome','/add-employee'];
  const navigate = useNavigate();
  useEffect(() => {  
  const token = localStorage.getItem('token');
  const storedUserType = localStorage.getItem('userType');
  if (!token) {
    navigate('/login');
    return;
  }
  if(token && storedUserType==="superadmin"){
      navigate('/superadminhome');
      return;
  }

}, [navigate]);
   
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