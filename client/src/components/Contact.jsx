// components/ConcernForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ConcernForm = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [subject, setSubject] = useState('');
  const [concern, setConcern] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/concern/concerns', {
        employeeName,
        subject,
        concern,
      });
      alert('Concern submitted successfully!');
      setEmployeeName('');
      setSubject('');
      setConcern('');
    } catch (error) {
      console.error('Error submitting concern:', error);
      alert('Failed to submit concern. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Generate Concern</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">
            Employee Name
          </label>
          <input
            type="text"
            id="employeeName"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="concern" className="block text-sm font-medium text-gray-700">
            Concern
          </label>
          <textarea
            id="concern"
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            required
            rows={4}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Concern
        </button>
      </form>
    </div>
  );
};

export default ConcernForm;
