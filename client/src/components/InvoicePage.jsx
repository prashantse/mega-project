// src/components/InvoicePage.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const InvoicePage = ({ medicines }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([{ id: '', amount: 0 }]);

  const addMedicineField = () => {
    setSelectedMedicines([...selectedMedicines, { id: '', amount: 0 }]);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = selectedMedicines.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setSelectedMedicines(updatedMedicines);
  };

  const removeMedicineField = (index) => {
    const updatedMedicines = selectedMedicines.filter((_, i) => i !== index);
    setSelectedMedicines(updatedMedicines);
  };

  const handleSaveInvoice = (e) => {
    e.preventDefault();
    axios.post('/api/invoices', { name, age, paymentMethod, selectedMedicines })
      .then(response => {
        toast.success("Invoice saved successfully");
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const medicineOptions = medicines.map(m => ({
    value: m.id,
    label: `${m.name} - $${m.price} - ${m.stock} in stock`,
  }));

  return (
    <div className='h-auto flex items-center justify-center bg-gradient-to-r from-orange-400 to-white'>
      <div className='w-auto bg-white p-8 rounded-md shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-orange-500'>Create Invoice</h1>
        <form onSubmit={handleSaveInvoice} className="grid grid-cols-1 gap-4">
          <div className="flex flex-wrap items-center">
            <label htmlFor="name" className='text-gray-600 font-semibold w-full md:w-1/3'>Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="age" className='text-gray-600 font-semibold w-full md:w-1/3'>Age</label>
            <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="paymentMethod" className='text-gray-600 font-semibold w-full md:w-1/3'>Payment Method</label>
            <input type="text" id="paymentMethod" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          {selectedMedicines.map((med, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-grow basis-4/5">
                <Select
                  id={`medicine-${index}`}
                  options={medicineOptions}
                  value={medicineOptions.find(option => option.value === med.id)}
                  onChange={option => handleMedicineChange(index, 'id', option.value)}
                  className='p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'
                />
              </div>
              <div className="w-1/5">
                <input type="number" id={`amount-${index}`} value={med.amount} onChange={e => handleMedicineChange(index, 'amount', e.target.value)} className='w-full p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
              </div>
              <div>
                <button type="button" onClick={() => removeMedicineField(index)} className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer'>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className='flex-space'>
          <button type="button" onClick={addMedicineField} className='bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 cursor-pointer mt-4'>Add More</button>
          <button type="submit" className='bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 cursor-pointer mt-4'>Save Invoice</button>
          </div>
          
        </form>
      </div>
      <ToastContainer autoClose={4000} />
    </div>
  );
};

export default InvoicePage;
