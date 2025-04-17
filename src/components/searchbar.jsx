import React, { useState } from "react";
import { Usesearch } from "./searchcontext";

const Searchbar = () => {
  const { updateFilters } = Usesearch();
  const [filters, updatefilters] = useState("");
  const [filterType, setFilterType] = useState("keyword");
  const [daterange, setDaterange] = useState({ start: "", end: "" });

  const handleSearch = (e) => {
    updatefilters(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleDaterangeChange = (e) => {
    const { name, value } = e.target;
    setDaterange((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterType === "daterange") {
      if (!daterange.start && !daterange.end) {
        alert("Please enter at least one date (start or end)");
        return;
      }
      updateFilters({ daterange });
    } else {
      if (filters.trim() === "") {
        alert("Please enter a search term");
        return;
      }
      updateFilters({ [filterType]: filters });
    }
    console.log(`Updated ${filterType} with value:`, filterType === "daterange" ? daterange : filters);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-20 max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 shadow-lg border-2 p-4 rounded-lg"
      >
        {/* Filter type selector */}
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="keyword">Keyword</option>
          <option value="status">Status</option>
          <option value="daterange">Date Range</option>
        </select>

        {/* Input based on filter type */}
        {filterType === "daterange" ? (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="date"
              name="start"
              value={daterange.start}
              onChange={handleDaterangeChange}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="end"
              value={daterange.end}
              onChange={handleDaterangeChange}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <input
            type="text"
            placeholder={`Enter ${filterType}`}
            value={filters}
            onChange={handleSearch}
            className="w-full sm:w-64 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition px-4 py-2"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
