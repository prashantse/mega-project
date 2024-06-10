import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const MedicineDetail = ({ medicines }) => {
  // Use useNavigate hook for redirection
  const navigate = useNavigate();

  const { id } = useParams();
  const selectedMedicine = medicines.find((medicine) => medicine._id === id);

  if (!selectedMedicine) {
    return <div>No medicine found with the specified ID.</div>;
  }

  const { name, salt, manufacturer, rate, expiryDate, stock, use, shelf } = selectedMedicine;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
      <div className="bg-orange-100 rounded-md overflow-hidden w-4/5 h-4/5 max-w-2xl photoo">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
            <h2 className="text-lg font-bold">{name}</h2>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-800 hover:cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Close
            </button>
          </div>
          <div className="flex-grow p-4 flex items-start">
            <img
              src = {`http://localhost:5173/src/components/Images/${name}.jpeg`} // Replace with the actual URL of the medicine photo
              alt={name}
              className="w-1/2 h-auto rounded-md shadow-md mr-4"
            />
            <div className="flex flex-col text-left ml-3 mb-5 text-xl">
              <p><strong>Salt:</strong> {salt}</p>
              <p><strong>Manufacturer:</strong> {manufacturer}</p>
              <p><strong>Rate:</strong> ₹{rate.toFixed(2)}</p>
              <p><strong>Expiry Date:</strong> {expiryDate}</p>
              <p><strong>Stock:</strong> {stock}</p>
              <p><strong>Shelf:</strong> {shelf}</p>
              <p><strong>Use For:</strong> {use}</p>
              <div className="mt-auto">
              <Link key={name} to={`/medicine/${id}/update`} className="text-blue-600 font-medium">
                <button key={name} to={`medicine/:${id}/update`} className="text-right bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-800 ml-20 mt-12">
                  Update
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
