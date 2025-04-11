import React, { useState } from "react";
import { Usesearch } from "./searchcontext";

const Searchbar = () => {
  const { updateFilters } = Usesearch(); // Access updateFilters from context
  const [filters, updatefilters] = useState(""); // For the search input
  const [filterType, setFilterType] = useState("keyword"); // Default filter type
  const [daterange, setDaterange] = useState({ start: "", end: "" }); // For daterange input

  const handleSearch = (e) => {
    updatefilters(e.target.value); // Update the search input state
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value); // Update the selected filter type
  };

  const handleDaterangeChange = (e) => {
    const { name, value } = e.target;
    setDaterange((prev) => ({ ...prev, [name]: value })); // Update start or end date
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterType === "daterange") {
      if (!daterange.start && !daterange.end) {
        alert("Please enter at least one date (start or end)");
        return;
      }
      updateFilters({ daterange }); // Update the daterange filter
    } else {
      if (filters.trim() === "") {
        alert("Please enter a search term");
        return;
      }
      updateFilters({ [filterType]: filters }); // Dynamically update the selected filter type
    }
    console.log(`Updated ${filterType} with value:`, filterType === "daterange" ? daterange : filters);
  };

  return (
    <div className="px-20">
      <div className="flex justify-center shadow-lg border-2 p-2 min-w-max rounded space-x-4">
        {/* Dropdown for selecting filter type */}
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="keyword">Keyword</option>
          <option value="status">Status</option>
          <option value="daterange">Date Range</option>
        </select>

        {/* Input fields for search */}
        {filterType === "daterange" ? (
          <div className="flex space-x-2">
            <input
              type="date"
              name="start"
              value={daterange.start}
              onChange={handleDaterangeChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="end"
              value={daterange.end}
              onChange={handleDaterangeChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <input
            type="text"
            placeholder={`Enter ${filterType}`}
            value={filters}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* Search button */}
        <button
          className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition px-3 py-1"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;