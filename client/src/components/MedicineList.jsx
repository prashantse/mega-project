import React , {useEffect ,useState}from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import axios from 'axios';



const MedicineList = ({ medicines }) => {
 
  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Medicine List</h2>
      <Search medicines={medicines} />
      <ul className="list-disc pl-6" style={{ maxHeight: '400px', overflowY: 'auto'}}>
        {medicines.map((medicine) => (
          <Link key={medicine._id} to={`/medicine/${medicine._id}`} className="text-blue-600 font-medium">
          <li className="flex items-center justify-between text-lg mb-4 hover:bg-orange-300 rounded-md cursor-pointer pl-10 pr-10">
            
            
              {medicine.name}
            
            <span className="text-gray-500 font-light">
              Stock: {medicine.stock} - Rate: ₹{medicine.rate.toFixed(2)}
            </span>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
