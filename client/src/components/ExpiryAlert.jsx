import React from "react";
import { Link } from "react-router-dom";

const ExpiryAlert = ({ medicines }) => {
  // Group medicines by year
  const groupByYear = (medicines) => {
    const groupedMedicines = {};

    medicines.forEach((medicine) => {
      const year = new Date(medicine.expiryDate).getFullYear();

      if (!groupedMedicines[year]) {
        groupedMedicines[year] = [];
      }
      groupedMedicines[year].push(medicine);
    });

    return groupedMedicines;
  };

  // Filter expired medicines
  const expiredMedicines = medicines.filter((medicine) => {
    return new Date(medicine.expiryDate) < new Date();
  });

  // Group expired medicines by year
  const expiredGroupedMedicines = groupByYear(expiredMedicines);

  // Get sorted keys (years) of grouped medicines
  const sortedKeys = Object.keys(groupByYear(medicines)).sort();

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-md shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4">Expiry Alert</h2>

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {/* Display expired medicines */}
          {Object.keys(expiredGroupedMedicines).length > 0 && (
            <div className="mb-4" style={{ border: "2px solid red", padding: "10px" }}>
              <h3 className="text-xl font-semibold mb-2">Expired Medicines</h3>
              <ul className="list-none">
                {Object.keys(expiredGroupedMedicines).map((year) => (
                  <div key={year}>
                    <h4 className="text-lg font-semibold mb-2">{year}</h4>
                    {expiredGroupedMedicines[year].map((medicine) => (
                      <Link to={`/medicine/${medicine._id}`} key={medicine._id}>
                        <li className="mb-2 bg-red-400 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-black">
                          {medicine.name} - Expiry Date: {medicine.expiryDate} - Shelf: {medicine.shelf}
                        </li>
                      </Link>
                    ))}
                  </div>
                ))}
              </ul>
            </div>
          )}

          {/* Display medicines grouped by year */}
          {sortedKeys.map((year) => (
            <div key={year} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{year}</h3>
              <ul className="list-none">
                {groupByYear(medicines)[year].map((medicine) => (
                  <Link to={`/medicine/${medicine._id}`} key={medicine._id}>
                    <li className="mb-2 bg-orange-400 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-black">
                      {medicine.name} - Expiry Date: {medicine.expiryDate} - Shelf: {medicine.shelf}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpiryAlert;
