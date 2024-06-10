import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GenInvoice = ({ medicines }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [medicineAmounts, setMedicineAmounts] = useState({});
  const navigate = useNavigate();

  const handleAddMedicine = (medicineId) => {
    if (!selectedMedicines.includes(medicineId)) {
      setSelectedMedicines([...selectedMedicines, medicineId]);
    }
  };

  const handleAmountChange = (medicineId, amount) => {
    setMedicineAmounts({ ...medicineAmounts, [medicineId]: amount });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    navigate('/invoice', {
      state: { selectedMedicines, medicineAmounts, medicines },
    });
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search medicines..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="block w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-500 mb-4"
      />
      <div className="h-64 overflow-y-auto">
        {filteredMedicines.map((medicine) => (
          <div
            key={medicine._id}
            className="flex items-center mb-4 p-2 border rounded bg-gray-800 shadow"
          >
            <span className="flex-1 text-white">{medicine.name}</span>
            <input
              type="number"
              placeholder="Amount"
              value={medicineAmounts[medicine._id] || ''}
              onChange={(e) => handleAmountChange(medicine._id, e.target.value)}
              className="p-2 border rounded w-20 mx-2 bg-gray-700 text-white"
            />
            <button
              onClick={() => handleAddMedicine(medicine._id)}
              className={`p-2 rounded ${
                selectedMedicines.includes(medicine._id) ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
              }`}
            >
              {selectedMedicines.includes(medicine._id) ? 'Added' : 'Add'}
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-4 p-2 bg-orange-600 text-white rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default GenInvoice;
