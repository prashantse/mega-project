import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/superadmin/employee', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Employee added successfully');
      navigate('/superadmin-home');
    } catch (error) {
      toast.error('Failed to add employee');
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Add Employee</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
            />
          ))}
          <button
            type="submit"
            className="bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 cursor-pointer mt-4"
          >
            Add Employee
          </button>
        </form>
        <ToastContainer autoClose={4000} />
      </div>
    </div>
  );
};

export default AddEmployee;
