import React, { useState } from 'react';

const MedicineUpdateForm = ({ selectedMedicine, onUpdate, onCancel }) => {
  const [updatedMedicine, setUpdatedMedicine] = useState({ ...selectedMedicine });
  const [validationError, setValidationError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMedicine({ ...updatedMedicine, [name]: value });
  };

  const handleUpdate = () => {
    // Check for empty fields before updating
    if (!updatedMedicine.name || !updatedMedicine.salt || !updatedMedicine.stock || !updatedMedicine.shelf || !updatedMedicine.expiryDate) {
      setValidationError('Please fill in all fields.');
      return;
    }
  
    // If all fields are filled, clear validation error
    setValidationError('');
  
    // Create a copy of the medicines array
    const updatedMedicines = medicines.map((medicine) =>
      medicine.id === updatedMedicine.id ? { ...updatedMedicine } : medicine
    );
  
    onUpdate(updatedMedicines);
    setUpdateSuccess(true);
  
    // Use the navigate function to go back to the previous page after a delay
    setTimeout(() => {
      onCancel(); // Close the update form after displaying the success message
      setUpdateSuccess(false);
      navigate(-1); // Go back to the previous page
    }, 3000);
  };
  

  return (
    <div className="bg-white p-8 rounded-md shadow-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Update Medicine</h2>

      {validationError && <div className="text-red-500 mb-4">{validationError}</div>}
      {updateSuccess && (
        <div className="text-green-500 mb-4">
          Medicine updated successfully! Redirecting back to details page...
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Medicine Name:</label>
        <input
          type="text"
          name="name"
          value={updatedMedicine.name}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Add similar input fields for other attributes (salt, stock, shelf, expiryDate) */}

      <button
        onClick={handleUpdate}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-800 mr-2"
      >
        Update
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        Cancel
      </button>
    </div>
  );
};

export default MedicineUpdateForm;
