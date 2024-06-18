import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Search from './Search';
import Modal from './Modal';

const SuperadminHomePage = () => {
  const [employees, setEmployees] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [medicines, setMedicines] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [searchMeds, setSearchMeds] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInvoice(null);
  };

  const filteredEmployees = employees?.data?.filter(employee => 
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const filteredInvoices = invoices?.data?.filter(invoice => 
    invoice.customerName.toLowerCase().includes(invoiceSearch.toLowerCase())
  );

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
        <input
          type="text"
          placeholder="Search Employees"
          value={employeeSearch}
          onChange={(e) => setEmployeeSearch(e.target.value)}
          className="p-2 border border-orange-500 rounded"
        />
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
            {filteredEmployees?.map(employee => (
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
      <div className="flex justify-between items-center mb-6 mt-8">
        <h2 className="text-2xl font-semibold">Invoices</h2>
        <input
          type="text"
          placeholder="Search Invoices"
          value={invoiceSearch}
          onChange={(e) => setInvoiceSearch(e.target.value)}
          className="p-2 border border-orange-500 rounded"
        />
      </div>
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
            {filteredInvoices?.map(invoice => (
              <tr key={invoice._id} onClick={() => handleInvoiceClick(invoice)} className="cursor-pointer">
                <td className="py-2 px-4 border-b border-gray-200">{invoice.customerName}</td>
                <td className="py-2 px-4 border-b border-gray-200">{invoice.customerAge}</td>
                <td className="py-2 px-4 border-b border-gray-200">{invoice.paymentType}</td>
                <td className="py-2 px-4 border-b border-gray-200">Rs.{invoice.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        {selectedInvoice && (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Invoice Details</h3>
            <p><strong>Customer Name:</strong> {selectedInvoice.customerName}</p>
            <p><strong>Customer Age:</strong> {selectedInvoice.customerAge}</p>
            <p><strong>Payment Type:</strong> {selectedInvoice.paymentType}</p>
            <p><strong>Total Amount:</strong> Rs.{selectedInvoice.totalAmount}</p>
            <p><strong>Date:</strong> {new Date(selectedInvoice.date).toLocaleString()}</p>
            <h4 className="text-lg font-semibold mt-4">Medicines</h4>
            <ul className="list-disc ml-6">
              {selectedInvoice.medicines.map((medicine, index) => (
                <li key={index}>
                  <p><strong>Medicine Name:</strong> {medicine.medicineName}</p>
                  <p><strong>Amount:</strong> {medicine.amount}</p>
                  <p><strong>Price:</strong> Rs.{medicine.price}</p>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SuperadminHomePage;
