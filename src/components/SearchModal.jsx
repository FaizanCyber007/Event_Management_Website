import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Technology",
    "Music",
    "Business",
    "Food & Drink",
    "Art & Culture",
    "Sports & Fitness",
    "Education",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(
        `/events?search=${encodeURIComponent(
          searchTerm
        )}&category=${encodeURIComponent(selectedCategory)}`
      );
      onClose();
      setSearchTerm("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative card-enhanced w-full max-w-2xl mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Search Events</h2>
          <button onClick={onClose} className="btn-icon">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search for events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-enhanced pl-12"
              autoFocus
            />
          </div>

          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-enhanced"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary w-full">
            <FontAwesomeIcon icon={faSearch} />
            <span>Search Events</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
