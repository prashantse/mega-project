// src/components/InvoiceSuccess.js
import React from 'react';

const InvoiceSuccess = () => {
  return (
    <div className='h-auto flex items-center justify-center bg-gradient-to-r from-orange-400 to-white'>
      <div className='w-auto bg-white p-8 rounded-md shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-orange-500'>Invoice Saved Successfully</h1>
      </div>
    </div>
  );
};

export default InvoiceSuccess;
