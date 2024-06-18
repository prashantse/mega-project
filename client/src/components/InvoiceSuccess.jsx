// src/components/InvoiceSuccess.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


const InvoiceSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className='h-800px flex items-center justify-center bg-gradient-to-r from-orange-400 to-white'>
      <div className='w-auto bg-white p-8 rounded-md shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-orange-500'>Invoice Saved Successfully</h1>
        <button onClick={navigate('/invoice')} className='bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 cursor-pointer mt-4'>New Invoice</button>
      </div>
    </div>
  );
};

export default InvoiceSuccess;
