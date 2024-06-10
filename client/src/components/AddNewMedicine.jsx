// AddNewMedicine.jsx
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddNewMedicine() {
 const [name, setName] = useState('');
 const [salt, setSalt] = useState('');
 const [manufacturer, setManufacturer] = useState('');
 const [rate, setRate] = useState('');
 const [expiryDate, setExpiryDate] = useState('');
 const [stock, setStock] = useState('');
 const [shelf, setShelf] = useState('');
 const [use, setUse] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const navigate =useNavigate()

 const submit = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !salt || !manufacturer || !rate || !expiryDate || !stock || !shelf) {
        setErrorMessage('Please fill in all fields');
        return;
    }

    if (parseInt(stock) <= 0 || parseInt(rate) <= 0) {
        setErrorMessage('Stock should be a positive value');
        return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    if (expiryDate <= today) {
      setErrorMessage('Expiry Date should be a future date');
      return;
    }
    // Clear error message
    setErrorMessage('');

    // Send data to the server
    axios.post("http://localhost:3001/api/addNewMedicine", { name, salt, manufacturer, rate, expiryDate, stock, shelf, use })
        .then(result => {
          console.log(result);
          navigate(-1)})
        .catch(err => console.log(err));
 }

  return (
    <div className='h-auto flex items-center justify-center bg-gradient-to-r from-orange-400 to-white'>
      <div className='w-auto bg-white p-8 rounded-md shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-orange-500'>Medicine Registration</h1>
        <form onSubmit={submit} className="grid grid-cols-1 gap-4">
           {errorMessage && <p className='text-red-500 mb-4'>{errorMessage}</p>}
           <div className="flex flex-wrap items-center">
             <label htmlFor="name" className='text-gray-600 font-semibold w-full md:w-1/3'>Medicine Name</label>
             <input type="text" id="name" onChange={(e) => setName(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'/>
           </div>
           <div className="flex flex-wrap items-center">
             <label htmlFor="salt" className='text-gray-600 font-semibold w-full md:w-1/3'>Salt Composition</label>
             <input type="text" id="salt" onChange={(e) => setSalt(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'/>
           </div>
           <div className="flex flex-wrap items-center">
             <label htmlFor="manufacturer" className='text-gray-600 font-semibold w-full md:w-1/3'>Manufacturer</label>
             <input type="text" id="manufacturer" onChange={(e) => setManufacturer(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'/>
           </div>
           <div className="flex flex-wrap items-center">
             <label htmlFor="rate" className='text-gray-600 font-semibold w-full md:w-1/3'>Rate</label>
             <input type="number" id="rate" onChange={(e) => setRate(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'/>
           </div>
           <div className="flex flex-wrap items-center">
             <label htmlFor="expiryDate" className='text-gray-600 font-semibold w-full md:w-1/3'>Expiry Date</label>
             <input type="date" id="expiryDate" onChange={(e) => setExpiryDate(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'/>
           </div>
           <div className="flex flex-wrap items-center">
             <label htmlFor="stock" className='text-gray-600 font-semibold w-full md:w-1/3'>Stock</label>
             <input type="number" id="stock" onChange={(e) => setStock(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'/>
           </div>
           <div className="flex flex-wrap items-center">
             <label htmlFor="shelf" className='text-gray-600 font-semibold w-full md:w-1/3'>Shelf</label>
             <input type="text" id="shelf" onChange={(e) => setShelf(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'/>
           </div>
           <div className="flex flex-wrap items-center">
             <label htmlFor="use" className='text-gray-600 font-semibold w-full md:w-1/3'>Use For</label>
             <input type="text" id="use" onChange={(e) => setUse(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'/>
           </div>
           <button type='submit' className='bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 cursor-pointer mt-4'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddNewMedicine;
