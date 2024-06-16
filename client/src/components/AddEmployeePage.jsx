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

  const [errors, setErrors] = useState({
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear previous error on field change
  };

  const validateForm = () => {
    const { username, email, password, firstName, lastName, phoneNumber, address } = formData;
    let valid = true;
    const newErrors = { ...errors };

    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      newErrors.username = 'Username should contain only letters and numbers';
      valid = false;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    if (password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters long';
      valid = false;
    }
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }
    if (!phoneNumber.match(/^\d{10}$/)) {
      newErrors.phoneNumber = 'Phone number should be exactly 10 digits';
      valid = false;
    }
    if (!address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/employee/addEmployee', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Employee added successfully');
      navigate('/superadminhome');
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
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
