// InvoiceDetailsModal.js
import React from 'react';

const InvoiceDetailsModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
        <p><strong>Customer Name:</strong> {invoice.customerName}</p>
        <p><strong>Customer Age:</strong> {invoice.customerAge}</p>
        <p><strong>Payment Type:</strong> {invoice.paymentType}</p>
        <p><strong>Total Amount:</strong> {invoice.totalAmount}</p>
        <p><strong>Date:</strong> {new Date(invoice.date).toLocaleString()}</p>
        <h2 className="text-xl font-bold mt-4">Medicines</h2>
        <ul className="list-disc pl-5 mt-2">
          {invoice.selectedMedicines.map((med, index) => (
            <li key={index}>
              {med.name} - {med.amount} units @ {med.rate}Rs/unit
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsModal;
