import React, { useState } from 'react';
import axios from 'axios';

const InvoicePage = () => {
  const [customerInfo, setCustomerInfo] = useState({ name: '', age: '', paymentType: '' });
  const [medicineSearches, setMedicineSearches] = useState([{ id: 1, search: '', amount: 1, selectedMedicine: null }]);
  const [allMedicines, setAllMedicines] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSearchChange = (index, value) => {
    const updatedSearches = [...medicineSearches];
    updatedSearches[index].search = value;
    setMedicineSearches(updatedSearches);

    if (value.length > 0) {
      axios.get(`http://localhost:3000/api/medicines?search=${value}`)
        .then(response => setAllMedicines(response.data))
        .catch(err => console.error(err));
    } else {
      setAllMedicines([]);
    }
  };

  const handleAmountChange = (index, value) => {
    const updatedSearches = [...medicineSearches];
    updatedSearches[index].amount = value;
    setMedicineSearches(updatedSearches);
  };

  const selectMedicine = (index, medicine) => {
    const updatedSearches = [...medicineSearches];
    updatedSearches[index].selectedMedicine = medicine;
    updatedSearches[index].search = '';
    setMedicineSearches(updatedSearches);
  };

  const removeMedicine = (index) => {
    const updatedSearches = [...medicineSearches];
    updatedSearches.splice(index, 1);
    setMedicineSearches(updatedSearches);
  };

  const addMedicineField = () => {
    setMedicineSearches([...medicineSearches, { id: medicineSearches.length + 1, search: '', amount: 1, selectedMedicine: null }]);
  };

  const handleSubmit = () => {
    const invoiceData = {
      customerInfo,
      selectedMedicines: medicineSearches.filter(search => search.selectedMedicine),
    };

    axios.post('http://localhost:3000/api/invoices', invoiceData)
      .then(response => {
        console.log('Invoice saved successfully:', response.data);
        // Redirect to a success page or perform any other action
      })
      .catch(error => {
        console.error('Error saving invoice:', error);
        // Handle error
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>

      <div className="mb-4">
        <label className="block text-red mb-1">Name:</label>
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={handleInputChange}
          className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-1">Age:</label>
        <input
          type="text"
          name="age"
          value={customerInfo.age}
          onChange={handleInputChange}
          className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-1">Type of Payment:</label>
        <input
          type="text"
          name="paymentType"
          value={customerInfo.paymentType}
          onChange={handleInputChange}
          className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-500"
        />
      </div>

      {medicineSearches.map((search, index) => (
        <div key={search.id} className="mb-4">
          {search.selectedMedicine ? (
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1 text-white">
                {search.selectedMedicine.name} - {search.amount} units
              </div>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => removeMedicine(index)}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row mb-2">
              <div className="flex-1">
                <label className="block text-white mb-1">Search Medicine:</label>
                <input
                  type="text"
                  value={search.search}
                  onChange={(e) => handleSearchChange(index, e.target.value)}
                  className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-500"
                />
                {search.search.length > 0 && (
                  <ul className="bg-gray-900 border border-gray-700 mt-2 rounded-lg">
                    {allMedicines.filter(med => med.name.toLowerCase().startsWith(search.search.toLowerCase())).map(med => (
                      <li
                        key={med._id}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-800"
                        onClick={() => selectMedicine(index, med)}
                      >
                        {med.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex-1 mt-2 md:mt-0 md:ml-4">
                <label className="block text-white mb-1">Amount:</label>
                <input
                  type="number"
                  value={search.amount}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-500"
                  min="1"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        className="p-2 bg-orange-600 text-white rounded mb-4"
        onClick={addMedicineField}
      >
        Add More Medicine
      </button>

      <button
        className="p-2 bg-green-600 text-white rounded"
        onClick={handleSubmit}
      >
        Save Invoice
      </button>
    </div>
  );
};

export default InvoicePage;
