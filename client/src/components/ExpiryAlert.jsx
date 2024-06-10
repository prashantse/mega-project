// ExpiryAlert.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ExpiryAlert = ({ medicines }) => {
  const [showExpiryInput, setShowExpiryInput] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState({});

  const handleExpiryDateChange = (event) => {
    const inputDate = event.target.value;
    setExpiryDate(inputDate);

    // Filter medicines based on the input date and group by month
    const filteredResults = medicines.filter((medicine) => {
      return new Date(medicine.expiryDate) <= new Date(inputDate);
    });

    // Group medicines by month
    const groupedMedicines = groupByMonth(filteredResults);

    setFilteredMedicines(groupedMedicines);
  };

  const handleToggleExpiryInput = () => {
    setShowExpiryInput(!showExpiryInput);
    setExpiryDate(""); // Reset the expiry date when toggling visibility
    setFilteredMedicines({}); // Clear the filtered results when hiding the input
  };

  const handleClearResults = () => {
    setExpiryDate("");
    setFilteredMedicines({}); // Clear the specific search result
  };

  // Helper function to group medicines by month
  const groupByMonth = (medicines) => {
    const groupedMedicines = {};

    medicines.forEach((medicine) => {
      const month = new Date(medicine.expiryDate).toLocaleString("en-us", {
        month: "long",
      });
      if (!groupedMedicines[month]) {
        groupedMedicines[month] = [];
      }
      groupedMedicines[month].push(medicine);
    });

    return groupedMedicines;
  };

  // Filter medicines that are going to expire within the next two months
  const currentMonthResults = medicines.filter((medicine) => {
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
    return new Date(medicine.expiryDate) <= twoMonthsLater;
  });

  // Group medicines expiring within two months by month
  const currentMonthGroupedMedicines = groupByMonth(currentMonthResults);

  return (
    <div className="container mx-auto p-8 ">
      <div className="bg-white rounded-md shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4">Expiry Alert for Next two monts</h2>
        <button
          onClick={handleToggleExpiryInput}
          className="bg-orange-700 text-white py-2 px-4 rounded-lg mb-4 hover:bg-gray-300 transition duration-300 inline-block"
        >
          {showExpiryInput ? "Hide Expiry Date Input" : "Enter Expiry Date"}
        </button>

        {showExpiryInput && (
          <div className="mb-4">
            <label
              htmlFor="expiryDate"
              className="text-right bg-orange-500 text-white px-4 py-2 rounded-md"
            >
              Enter Expiry Date:
            </label>
            <input
              type="date"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="mb-2 ml-5 text-red-800 bg-white border-orange-700 border-2"
              style={{ borderRadius: "5px" }}
            />
            <button
              onClick={handleClearResults}
              className="text-right bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-800 ml-4"
            >
              Clear result
            </button>
          </div>
        )}
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {/* Display medicines expiring within the next two months */}
          <div className="mb-4">
            {Object.keys(currentMonthGroupedMedicines).map((month) => (
              <div key={month} className="mb-2">
                <h3 className="text-xl font-semibold mb-2">{month}</h3>
                <ul className="list-none">
                  {currentMonthGroupedMedicines[month]?.map((medicine) => (
                    <Link to={`/medicine/${medicine._id}`}>
                    <li
                      key={medicine.name}
                      className="mb-2 bg-orange-400 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-black"
                    >
                      
                        {medicine.name}
                      
                      - Expiry Date: {medicine.expiryDate} -Shelf:{" "}
                      {medicine.shelf}
                    </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Display specific search results if available */}
          {Object.keys(filteredMedicines).length > 0 && (
            <div className="mb-4">
              {Object.keys(filteredMedicines).map((month) => (
                <div key={month} className="mb-2">
                  <h3 className="text-xl font-semibold mb-2">{month}</h3>
                  <ul className="list-none">
                    {filteredMedicines[month]?.map((medicine) => (
                      <li
                        key={medicine.id}
                        className="mb-2 bg-orange-400 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-black"
                      >
                        <Link to={`/medicine/${medicine.id}`}>
                          {medicine.name}
                        {" "}
                        - Expiry Date: {medicine.expiryDate} -Shelf:{" "}
                        {medicine.shelf}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Display message if no specific search results */}
        {/* {Object.keys(filteredMedicines).length === 0 && (
          <p>No medicines with expiry dates near the specified date.</p>
        )} */}
      </div>
    </div>
  );
};

export default ExpiryAlert;
