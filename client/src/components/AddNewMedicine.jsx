import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewMedicine() {
  const [formData, setFormData] = useState({
    name: '',
    salt: '',
    manufacturer: '',
    rate: '',
    expiryDate: '',
    stock: '',
    shelf: '',
    use: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Debugging: log form data before validation

    const { name, salt, manufacturer, rate, expiryDate, stock, shelf } = formData;

    // Validation
    if (!name || !salt || !manufacturer || !rate || !expiryDate || !stock || !shelf) {
      setErrorMessage('Please fill in all fields');
      toast.error('Please fill in all fields', { autoClose: 4000 });
      return;
    }

    if (parseInt(stock) <= 0 || parseInt(rate) <= 0) {
      setErrorMessage('Stock and Rate should be positive values');
      toast.error('Stock and Rate should be positive values', { autoClose: 4000 });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (expiryDate <= today) {
      setErrorMessage('Expiry Date should be a future date');
      toast.error('Expiry Date should be a future date', { autoClose: 4000 });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/medicines/addNewMedicine", formData);
      console.log('Server Response:', response); // Debugging: log server response
      toast.success('Medicine added successfully', { autoClose: 4000 });
      navigate(-1);
    } catch (err) {
      console.error('Error Response:', err.response); // Debugging: log error response
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error, { autoClose: 4000 });
      } else {
        toast.error('Error adding medicine', { autoClose: 4000 });
      }
    }
  };

  return (
    <div className='h-auto flex items-center justify-center bg-gradient-to-r from-orange-400 to-white'>
      <div className='w-auto bg-white p-8 rounded-md shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-orange-500'>Medicine Registration</h1>
        <form onSubmit={submit} className="grid grid-cols-1 gap-4">
          {errorMessage && <p className='text-red-500 mb-4'>{errorMessage}</p>}
          <div className="flex flex-wrap items-center">
            <label htmlFor="name" className='text-gray-600 font-semibold w-full md:w-1/3'>Medicine Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="salt" className='text-gray-600 font-semibold w-full md:w-1/3'>Salt Composition</label>
            <input type="text" id="salt" value={formData.salt} onChange={handleChange} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="manufacturer" className='text-gray-600 font-semibold w-full md:w-1/3'>Manufacturer</label>
            <input type="text" id="manufacturer" value={formData.manufacturer} onChange={handleChange} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="rate" className='text-gray-600 font-semibold w-full md:w-1/3'>Rate</label>
            <input type="number" id="rate" value={formData.rate} onChange={handleChange} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="expiryDate" className='text-gray-600 font-semibold w-full md:w-1/3'>Expiry Date</label>
            <input type="date" id="expiryDate" value={formData.expiryDate} onChange={handleChange} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="stock" className='text-gray-600 font-semibold w-full md:w-1/3'>Stock</label>
            <input type="number" id="stock" value={formData.stock} onChange={handleChange} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="shelf" className='text-gray-600 font-semibold w-full md:w-1/3'>Shelf</label>
            <input type="text" id="shelf" value={formData.shelf} onChange={handleChange} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="use" className='text-gray-600 font-semibold w-full md:w-1/3'>Use For</label>
            <input type="text" id="use" value={formData.use} onChange={handleChange} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <button type='submit' className='bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 cursor-pointer mt-4'>Submit</button>
        </form>
      </div>
      <ToastContainer autoClose={4000} />
    </div>
  );
}

export default AddNewMedicine;
