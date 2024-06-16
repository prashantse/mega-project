import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import ''; // Create this file for custom CSS animations

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="shadow sticky z-10 top-0 photoo border-b-2 header-show">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="http://localhost:5173/src/components/Images/Newlogominiproject.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>
          <div
            className="lg:flex lg:items-center lg:w-auto lg:order-1 flex-wrap"
            id="mobile-menu-2"
          >

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
