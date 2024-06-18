import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import ''; // Create this file for custom CSS animations

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from local storage
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    if (token) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }

    // Scroll event listener
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className={`shadow sticky z-10 top-0 photoo border-b-2 ${isScrollingUp ? 'header-show' : 'header-hide'}`}>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="http://localhost:5173/src/components/Images/Newlogominiproject.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>
          <div className="flex items-center lg:order-2 space-x-2 lg:space-x-8 flex-wrap">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 mb-2 lg:mb-0 focus:outline-none"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 mb-2 lg:mb-0 focus:outline-none"
              >
                Log in
              </Link>
            )}
            <Link
              to="/invoice"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 mb-2 lg:mb-0 focus:outline-none"
            >
               Generate Invoice
            </Link>
          </div>
          <div
            className="lg:flex lg:items-center lg:w-auto lg:order-1 flex-wrap"
            id="mobile-menu-2"
          >
            <ul className="flex flex-wrap mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to={userType === 'superadmin' ? '/superadminhome' : '/'}
                  className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-1`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/medicines"
                  className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-1`}
                >
                  Medicines
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/alertpage"
                  className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-1`}
                >
                  Alerts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-1`}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-1`}
                >
                  Contact superadmin
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/invoices"
                  className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-1`}
                >
                  Invoices
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
