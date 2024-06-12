import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterSuperadminPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/superadmin/register', { username, email, password, firstName, lastName });
      if (response.data.success) {
        navigate('/home');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error registering superadmin');
    }
  };

  return (
    <div className='h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-white'>
      <div className='w-auto bg-white p-8 rounded-md shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-orange-500'>Register Superadmin</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex flex-wrap items-center">
            <label htmlFor="username" className='text-gray-600 font-semibold w-full md:w-1/3'>Username</label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="email" className='text-gray-600 font-semibold w-full md:w-1/3'>Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="password" className='text-gray-600 font-semibold w-full md:w-1/3'>Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="firstName" className='text-gray-600 font-semibold w-full md:w-1/3'>First Name</label>
            <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="lastName" className='text-gray-600 font-semibold w-full md:w-1/3'>Last Name</label>
            <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className='w-full md:w-2/3 p-3 border border-orange-500 rounded focus:outline-none focus:ring focus:border-orange-300' />
          </div>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          <button type='submit' className='bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 cursor-pointer mt-4'>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterSuperadminPage;
