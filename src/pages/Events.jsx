import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSort,
  faCalendarAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import { eventsData, eventCategories } from "../data/events";

const Events = () => {
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [priceRange, setPriceRange] = useState("all");
  const [loading, setLoading] = useState(false);

  // Filter and sort events
  useEffect(() => {
    setLoading(true);
    let filtered = [...eventsData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.shortDescription
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          event.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    // Price filter
    if (priceRange !== "all") {
      filtered = filtered.filter((event) => {
        const price = parseInt(event.price.replace("$", ""));
        switch (priceRange) {
          case "free":
            return price === 0;
          case "under50":
            return price > 0 && price < 50;
          case "50to100":
            return price >= 50 && price <= 100;
          case "over100":
            return price > 100;
          default:
            return true;
        }
      });
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date) - new Date(b.date);
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return (
            parseInt(a.price.replace("$", "")) -
            parseInt(b.price.replace("$", ""))
          );
        case "popularity":
          return b.registeredCount - a.registeredCount;
        default:
          return 0;
      }
    });

    // Simulate loading
    setTimeout(() => {
      setFilteredEvents(filtered);
      setLoading(false);
    }, 300);
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
    { value: "popularity", label: "Popularity" },
  ];

  const priceOptions = [
    { value: "all", label: "All Prices" },
    { value: "free", label: "Free" },
    { value: "under50", label: "Under $50" },
    { value: "50to100", label: "$50 - $100" },
    { value: "over100", label: "Over $100" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-blue-500 rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-1/2 left-10 w-20 h-20 bg-purple-500 rounded-full blur-xl animate-bounce-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-poppins text-white mb-6">
            Upcoming <span className="gradient-text">Events</span>
          </h1>
          <p className="text-xl text-gray-300 font-inter max-w-3xl mx-auto leading-relaxed mb-12">
            Discover amazing events happening around the world. From tech
            conferences to music festivals, find your next unforgettable
            experience.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold gradient-text">
                {eventsData.length}
              </div>
              <div className="text-gray-300 text-sm font-inter">
                Total Events
              </div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold gradient-text">
                {eventCategories.length - 1}
              </div>
              <div className="text-gray-300 text-sm font-inter">Categories</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold gradient-text">50+</div>
              <div className="text-gray-300 text-sm font-inter">Cities</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold gradient-text">24/7</div>
              <div className="text-gray-300 text-sm font-inter">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              categories={eventCategories}
            />
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faSort} className="text-primary-400" />
              <label className="text-gray-300 font-inter text-sm">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 font-inter"
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-slate-800"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="text-primary-400"
              />
              <label className="text-gray-300 font-inter text-sm">Price:</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 font-inter"
              >
                {priceOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-slate-800"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="ml-auto flex items-center space-x-2 text-gray-300 font-inter">
              <FontAwesomeIcon icon={faFilter} className="text-primary-400" />
              <span>{filteredEvents.length} events found</span>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            // Loading State
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-6 animate-pulse"
                >
                  <div className="bg-white/20 rounded-lg h-48 mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-white/20 rounded h-6 w-3/4"></div>
                    <div className="bg-white/20 rounded h-4 w-1/2"></div>
                    <div className="bg-white/20 rounded h-4 w-2/3"></div>
                    <div className="bg-white/20 rounded h-10 w-full mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            // Events Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            // No Results State
            <div className="text-center py-20">
              <div className="glass rounded-2xl p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-primary-400 text-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold font-poppins text-white mb-4">
                  No Events Found
                </h3>
                <p className="text-gray-300 font-inter leading-relaxed mb-6">
                  We couldn't find any events matching your criteria. Try
                  adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setPriceRange("all");
                    setSortBy("date");
                  }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold font-inter hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl animate-bounce-slow"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">
            Never Miss an Event
          </h2>
          <p className="text-xl text-white/90 font-inter mb-8 leading-relaxed">
            Subscribe to our newsletter and get notified about the latest events
            in your area
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white font-inter"
            />
            <button
              type="submit"
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold font-inter hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Events;
