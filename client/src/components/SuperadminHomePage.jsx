import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Search from './Search';

const SuperadminHomePage = () => {
  const [employees, setEmployees] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [medicines, setMedicines] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [searchMeds, setSearchMeds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    if (token && storedUserType !== "superadmin") {
      navigate('/about');
      return;
    }
    if (token) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }

    axios.get('http://localhost:3000')
      .then(result => setSearchMeds(result.data))
      .catch(err => console.log(err));

    const fetchData = async () => {
      try {
        const employeesResponse = await axios.get('http://localhost:3000/api/employees/allEmployees');
        setEmployees(employeesResponse?.data);

        const invoicesResponse = await axios.get('http://localhost:3000/api/invoices/allInvoices');
        setInvoices(invoicesResponse?.data);

        const medicinesResponse = await axios.get('http://localhost:3000/api/v2/getAllmeds');
        const medicinesData = medicinesResponse?.data.reduce((acc, medicine) => {
          acc[medicine._id] = medicine;
          return acc;
        }, {});
        setMedicines(medicinesData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-between mb-6">
        <img
          src="http://localhost:5173/src/components/Images/Newlogominiproject.png"
          className="mr-3 h-12"
          alt="Logo"
        />
        <h1 className="text-3xl font-bold text-center text-orange-500 flex-grow">Superadmin Dashboard</h1>
        <div className="flex space-x-4">
          <Link to="/add-employee" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
            Add Employee
          </Link>
          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Log out
          </button>
        </div>
      </div>
      <Search medicines={searchMeds} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Employees</h2>
      </div>
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
            {employees?.data?.map(employee => (
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
      <h2 className="text-2xl font-semibold mb-4 mt-8">Invoices</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Customer Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Customer Age</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Payment Type</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.data?.map(invoice => (
              <tr key={invoice._id} onClick={() => handleInvoiceClick(invoice)} className="cursor-pointer">
                <td className="py-2 px-4 border-b border-gray-200">{invoice.customerName}</td>
                <td className="py-2 px-4 border-b border-gray-200">{invoice.customerAge}</td>
                <td className="py-2 px-4 border-b border-gray-200">{invoice.paymentType}</td>
                <td className="py-2 px-4 border-b border-gray-200">${invoice.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedInvoice && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Invoice Details</h3>
          <p><strong>Customer Name:</strong> {selectedInvoice.customerName}</p>
          <p><strong>Customer Age:</strong> {selectedInvoice.customerAge}</p>
          <p><strong>Payment Type:</strong> {selectedInvoice.paymentType}</p>
          <p><strong>Total Amount:</strong> ${selectedInvoice.totalAmount}</p>
          <p><strong>Date:</strong> {new Date(selectedInvoice.date).toLocaleString()}</p>
          <h4 className="text-lg font-semibold mt-4">Medicines</h4>
          <ul className="list-disc ml-6">
            {selectedInvoice.medicines.map((medicine, index) => (
              <li key={index}>
                <p><strong>Medicine Name:</strong> {medicine.medicineName}</p>
                <p><strong>Amount:</strong> {medicine.amount}</p>
                <p><strong>Price:</strong> ${medicine.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SuperadminHomePage;
