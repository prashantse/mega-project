// src/components/InvoicePage.js
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const InvoicePage = () => {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();
  // console.log(medicines);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {

        const medicinesResponse = await axios.get('http://localhost:3000/api/v2/getAllmeds');
        console.log(medicinesResponse);
        console.log(medicinesResponse.data);
        setMedicines(medicinesResponse?.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      age: '',
      paymentMethod: '',
      selectedMedicines: [{ id: '', amount: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'selectedMedicines',
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/invoices/addInvoice', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      navigate('/invoice-success');
    } catch (error) {
      toast.error('Failed to save invoice. Please try again.');
    }
  };

  const medicineOptions = medicines?.data?.map(m => ({
    value: m._id,
    label: `${m.name} - ${m.rate}Rs/ - ${m.stock} in stock`,
  }));

  return (
    <div className='h-auto flex items-center justify-center bg-gradient-to-r from-orange-400 to-white'>
      <div className='w-auto bg-white p-8 rounded-md shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-orange-500'>Create Invoice</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
          <div className="flex flex-wrap items-center">
            <label htmlFor="name" className='text-gray-600 font-semibold w-full md:w-1/3'>Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="age" className='text-gray-600 font-semibold w-full md:w-1/3'>Age</label>
            <input
              type="number"
              id="age"
              {...register('age', { required: 'Age is required' })}
              className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="paymentMethod" className='text-gray-600 font-semibold w-full md:w-1/3'>Payment Method</label>
            <input
              type="text"
              id="paymentMethod"
              {...register('paymentMethod', { required: 'Payment method is required' })}
              className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'
            />
            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="flex-grow basis-4/5">
                <Controller
                  control={control}
                  name={`selectedMedicines.${index}.id`}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={medicineOptions}
                      value={medicineOptions.find(option => option.value === value)}
                      onChange={option => onChange(option.value)}
                      className='p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'
                    />
                  )}
                />
              </div>
              <div className="w-1/5">
                <input
                  type="number"
                  {...register(`selectedMedicines.${index}.amount`, { required: 'Amount is required', min: 1 })}
                  className='w-full p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300'
                />
                {errors.selectedMedicines?.[index]?.amount && <p className="text-red-500 text-sm">{errors.selectedMedicines[index].amount.message}</p>}
              </div>
              <div>
                <button type="button" onClick={() => remove(index)} className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer'>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className='flex justify-between'>
            <button type="button" onClick={() => append({ id: '', amount: 1 })} className='bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 cursor-pointer mt-4'>Add More</button>
            <button type="submit" className='bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 cursor-pointer mt-4'>Save Invoice</button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={4000} />
    </div>
  );
};

export default InvoicePage;
