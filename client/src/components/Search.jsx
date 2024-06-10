import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Search = ({ medicines }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(null);

  const inputRef = useRef(null);
   
  useEffect(() => {
    const filteredResults = medicines.filter((medicine) =>
      medicine.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
    setSearchResults(filteredResults);
    setSelectedResultIndex(null);
  }, [searchTerm, medicines]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (searchResults.length === 0) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setSelectedResultIndex((prevIndex) =>
          prevIndex === null ? searchResults.length - 1 : Math.max(0, prevIndex - 1)
        );
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedResultIndex((prevIndex) =>
          prevIndex === null ? 0 : Math.min(searchResults.length - 1, prevIndex + 1)
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedResultIndex !== null) {
          const selectedMedicine = searchResults[selectedResultIndex];
          setSearchTerm('');
          setSelectedResultIndex(null);
          inputRef.current.blur(); // Remove focus from input
          // Navigate to the selected medicine detail page
          // Replace with your actual route or navigation logic
          console.log(`Navigate to: /medicine/${selectedMedicine.id}`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-orange-400 text-white rounded-lg p-4 mb-5">
      <input
        type="text"
        placeholder="Search medicines..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="block w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-500"
        ref={inputRef}
      />
      {searchTerm.length > 0 && searchResults.length > 0 && (
        <ul className="list-none mt-4">
          {searchResults.map((medicine, index) => (
            <Link to={`/medicine/${medicine._id}`}>
            <li
              key={medicine._id}
              className={`mb-2 th-3 hover:bg-gray-700 text-white px-3 py-2 rounded-lg cursor-pointer ${
                selectedResultIndex === index ? 'bg-gray-700' : ''
              }`}
            >
              
                {medicine.name}
              
            </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
