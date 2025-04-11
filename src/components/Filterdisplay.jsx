import React from "react";
import { Usesearch } from "./searchcontext";

const FilterDisplay = () => {
  const { filters, Resetfilters } = Usesearch(); // Access filters and Resetfilters from context
 const daterange=filters.daterange|| {start:"None", end:"None"}
  return (
    <div className="bg-white shadow-lg rounded-lg p-4  mx-2  w-full max-w-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Active Filters</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Status:</span>
          <span className="text-gray-800">{filters.status || "None"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Keyword:</span>
          <span className="text-gray-800">{filters.keyword || "None"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Date Range:</span>
          <span className="text-gray-800">
            {daterange.start || "None"} - {daterange.end || "None"}
          </span>
        </div>
      </div>
      <button
        onClick={Resetfilters}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterDisplay;