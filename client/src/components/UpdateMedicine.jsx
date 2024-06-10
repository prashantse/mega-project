// UpdateMedicine.jsx
import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateMedicine = ({ medicines }) => {

  const { id } = useParams();
  // const selectedMedicine = medicines.find((medicine) => medicine._id === id);

  // State for form fields
  const [name, setName] = useState();
  const [salt, setSalt] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [rate, setRate] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [stock, setStock] =useState();
  const [shelf, setShelf] = useState();
  const [use, setUse] = useState();
  const navigate = useNavigate();

  // const handleUpdate = () => {
  //   // Perform validation before updating
  //   if (stock <= 0 || rate <= 0 || !name || !salt || !manufacturer || !expiryDate || !use || !shelf) {
  //     // Display an error message or handle it according to your UI/UX requirements
  //     alert('Please fill in all fields, and ensure stock and rate are greater than 0.');
  //   } else {
  //     // Update the medicine information (you may want to use a state management library or API call)
  //     // For simplicity, we are updating the state directly here
  //     const updatedMedicine = {
  //       ...selectedMedicine,
  //       name,
  //       salt,
  //       manufacturer,
  //       rate,
  //       expiryDate,
  //       stock,
  //       use,
  //       shelf,
  //     };

      // You might want to dispatch an action to update the state or make an API call here
      // For simplicity, we are updating the state directly
  //     const updatedMedicines = medicines.map((medicine) =>
  //       medicine._id === id ? updatedMedicine : medicine
  //     );

  //     // Redirect back to the details page after updating
  //     navigate(-1);
  //   }
  // };

  const update = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !salt || !manufacturer || !rate  || !expiryDate || !stock || !shelf) {
      alert('Please fill in all fields');
      return;
    }

    if (parseInt(stock) <= 0 || parseInt(rate) <= 0) {
      alert('Stock should be a positive value');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (expiryDate <= today) {
      alert('Expiry Date should be a future date');
      return;
    }

    // Send data to the server
    axios.put("http://localhost:3001/api/updateMedicine/"+id, { name, salt, manufacturer, rate, expiryDate, stock, shelf, use })
    .then(result => {
      console.log(result);
      navigate(`/medicines`)})
    .catch(err => console.log(err));
      
  };

  useEffect(() => {
    axios.get('http://localhost:3001/getmeds/'+id)
    .then(result => {console.log(result),
       setName(result.data.name)
       setSalt(result.data.salt)
       setManufacturer(result.data.manufacturer)
       setRate(result.data.rate)
       setExpiryDate(result.data.expiryDate)
       setStock(result.data.stock)
       setShelf(result.data.shelf)
       setUse(result.data.use)
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="bg-orange-100 rounded-md overflow-hidden p-6 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Update Medicine</h2>
      <form onSubmit={update}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 w-full rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="salt" className="block text-sm font-medium text-gray-600">
          Salt
        </label>
        <input
          type="text"
          id="salt"
          className="mt-1 p-2 w-full rounded-md"
          value={salt}
          onChange={(e) => setSalt(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-600">
          Manufacturer
        </label>
        <input
          type="text"
          id="manufacturer"
          className="mt-1 p-2 w-full rounded-md"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rate" className="block text-sm font-medium text-gray-600">
          Rate
        </label>
        <input
          type="number"
          id="rate"
          className="mt-1 p-2 w-full rounded-md"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-600">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          className="mt-1 p-2 w-full rounded-md"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="stock" className="block text-sm font-medium text-gray-600">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          className="mt-1 p-2 w-full rounded-md"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="use" className="block text-sm font-medium text-gray-600">
          Use
        </label>
        <input
          type="text"
          id="use"
          className="mt-1 p-2 w-full rounded-md"
          value={use}
          onChange={(e) => setUse(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="shelf" className="block text-sm font-medium text-gray-600">
          Shelf
        </label>
        <input
          type="text"
          id="shelf"
          className="mt-1 p-2 w-full rounded-md"
          value={shelf}
          onChange={(e) => setShelf(e.target.value)}
        />
      </div>
        
        <div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-800"
            // onClick={handleUpdate}
          >
            Update Medicine
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-800 hover:cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMedicine;
