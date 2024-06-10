// AddMedicineCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AddMedicineCard = () => {
  return (
    <div className="bg-orange-700 text-white rounded-lg p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-2xl font-semibold mb-4">Add a New Medicine</h2>
      <p className="text-gray-300 mb-4">
        Click below to add a new medicine to the inventory.
      </p>
      <Link
        to="/addNewmedicine"
        className="bg-white text-orange-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 inline-block"
      >
        Add Medicine
      </Link>
    </div>
  );
};

export default AddMedicineCard;
