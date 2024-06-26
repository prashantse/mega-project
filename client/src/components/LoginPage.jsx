import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'superadmin' // Default to superadmin
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = formData.userType === 'superadmin' ? 'http://localhost:3000/api/auth/login/superadmin' : 'http://localhost:3000/api/auth/login/employee';
      const response = await axios.post(endpoint, formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', formData.userType ==='superadmin'?"superadmin":"employee");
      toast.success('Login successful');
      formData.userType === 'superadmin' ?
      navigate('/superadminhome'):navigate('/');
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div>
    <header className="shadow sticky z-10 top-0 photoo border-b-2 header-show">
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link  className="flex items-center">
          <img
            src="http://localhost:5173/src/components/Images/Newlogominiproject.png"
            className="mr-3 h-12"
            alt="Logo"
          />
        </Link>
      </div>
    </nav>
  </header>
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-white z-99">
      
      
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Login</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
          />
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
          >
            <option value="superadmin">Superadmin</option>
            <option value="employee">Employee</option>
          </select>
          <button
            type="submit"
            className="bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 cursor-pointer mt-4"
          >
            Login
          </button>
        </form>
        <ToastContainer autoClose={4000} />
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
           <p>Call 8851701738</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
