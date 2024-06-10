// MedicinePage.jsx
import React from 'react';
import MedicineList from './MedicineList';
import AddMedicineCard from './AddMedicineCard';

const MedicinePage = ({ medicines}) => {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-md shadow-md p-6 photo2">
        <h2 className="text-3xl font-bold mb-4">Medicine Page</h2>
        <AddMedicineCard /> 
        <MedicineList medicines={medicines} />
        
      </div>
    </div>
  );
};

export default MedicinePage;
