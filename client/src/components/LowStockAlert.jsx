// LowStockAlert.jsx
import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LowStockAlert = ({ medicines }) => {
  const [showLowStock, setShowLowStock] = useState(true);


  const lowStockMedicines = medicines.filter((medicine) => medicine.stock < 5);

  const handleToggleLowStock = () => {
    setShowLowStock(!showLowStock);
  };
  

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-md shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4">Low Stock Alert</h2>
       

        {showLowStock && (
          <div
            className="mb-4"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <ul className="list-none">
              {lowStockMedicines.map((medicine) => (
                <li
                  key={medicine.name}
                  className="mb-2 bg-yellow-500 text-white px-3 py-2 rounded-lg cursor-pointer flex justify-between items-center hover:bg-black"
                >
                  <span>
                    {" "}
                    <Link to={`/medicine/${medicine._id}`}>
                      {medicine.name}- Stock: {medicine.stock}{" "}
                    </Link>
                  </span>
                  <a
                    href={`https://example.com/buy/${medicine.name}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-800"
                  >
                    Buy
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!showLowStock && <p>No medicines with stock lower than 5.</p>}
      </div>
    </div>
  );
};

export default LowStockAlert;
