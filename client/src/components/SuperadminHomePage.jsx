import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SuperadminHomePage = () => {
  const [employees, setEmployees] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/superadmin/home', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEmployees(response.data.employees);
        setInvoices(response.data.invoices);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Superadmin Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Employees</h2>
        <Link to="/add-employee" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
          Add Employee
        </Link>
      </div>

      {employees.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">First Name</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Last Name</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Email</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Phone Number</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee._id}>
                  <td className="py-2 px-4 border-b border-gray-200">{employee.firstName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{employee.lastName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{employee.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{employee.phoneNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{employee.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No employees found.</p>
      )}

      <h2 className="text-2xl font-semibold mb-4 mt-8">Invoices</h2>
      {invoices.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Invoice Number</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice._id}>
                  <td className="py-2 px-4 border-b border-gray-200">#{invoice.number}</td>
                  <td className="py-2 px-4 border-b border-gray-200">${invoice.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
};

export default SuperadminHomePage;
