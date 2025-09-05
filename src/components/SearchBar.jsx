import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faFilter } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch, onFilterChange, categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange(category);
    setIsFilterOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Main Search Bar */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative flex items-center glass rounded-2xl p-2 shadow-lg">
          {/* Search Icon */}
          <div className="flex items-center justify-center w-12 h-12 text-primary-400">
            <FontAwesomeIcon icon={faSearch} className="text-lg" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search events by name, venue, or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none font-inter px-2 py-2"
          />

          {/* Clear Button */}
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white transition-colors duration-200 mr-2"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              selectedCategory !== "All"
                ? "bg-primary-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            <FontAwesomeIcon icon={faFilter} />
            <span className="hidden sm:inline font-inter">
              {selectedCategory}
            </span>
          </button>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isFilterOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold font-poppins text-white mb-4">
            Filter by Category
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg font-medium font-inter transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-primary-500 text-white shadow-lg glow-green"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory !== "All") && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-400 font-inter">
            Active filters:
          </span>

          {searchTerm && (
            <div className="flex items-center space-x-2 bg-primary-500/20 border border-primary-500/30 rounded-lg px-3 py-1">
              <span className="text-sm text-primary-300 font-inter">
                Search: "{searchTerm}"
              </span>
              <button
                onClick={clearSearch}
                className="text-primary-300 hover:text-white transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xs" />
              </button>
            </div>
          )}

          {selectedCategory !== "All" && (
            <div className="flex items-center space-x-2 bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-1">
              <span className="text-sm text-blue-300 font-inter">
                Category: {selectedCategory}
              </span>
              <button
                onClick={() => handleCategoryChange("All")}
                className="text-blue-300 hover:text-white transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xs" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
