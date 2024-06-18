// src/components/Invoices.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const Invoices = () => {
  const [allInvoices, setAllInvoices] = useState([]); // Store all fetched invoices
  const [filteredInvoices, setFilteredInvoices] = useState([]); // Store filtered invoices
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const invoicesPerPage = 10;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/invoices/getAllInvoices', {
          params: { page: currentPage, limit: invoicesPerPage }
        });
        setAllInvoices(response.data.invoices);
        setTotalPages(response.data.totalPages);
        setFilteredInvoices(response.data.invoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, [currentPage]);

  useEffect(() => {
    const filtered = allInvoices.filter(invoice =>
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInvoices(filtered);
    setTotalPages(Math.ceil(filtered.length / invoicesPerPage));
    setCurrentPage(1);
  }, [searchQuery, allInvoices]);

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInvoice(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const displayedInvoices = filteredInvoices.slice((currentPage - 1) * invoicesPerPage, currentPage * invoicesPerPage);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Invoices</h2>
      <input
        type="text"
        placeholder="Search Invoices"
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 mb-4 border border-gray-300 rounded-md"
      />
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
            {displayedInvoices.map((invoice) => (
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
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-md ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showModal && (
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
      )}
    </div>
  );
};

export default Invoices;
