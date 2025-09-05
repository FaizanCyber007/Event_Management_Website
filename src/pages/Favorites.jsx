import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCalendarAlt,
  faUsers,
  faArrowRight,
  faTrash,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import EventCard from "../components/EventCard";

const Favorites = () => {
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  useEffect(() => {
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteEvents(favorites);
  }, []);

  const removeFavorite = (eventId) => {
    const updatedFavorites = favoriteEvents.filter(
      (event) => event.id !== eventId
    );
    setFavoriteEvents(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    // Dispatch event to update navbar counter
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  };

  const clearAllFavorites = () => {
    setFavoriteEvents([]);
    localStorage.removeItem("favorites");
    // Dispatch event to update navbar counter
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  };

  if (favoriteEvents.length === 0) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <FontAwesomeIcon icon={faHeart} className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-poppins">
              No Favorites Yet
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Start exploring events and add them to your favorites to see them
              here.
            </p>
            <Link to="/events" className="btn-primary">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Browse Events</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-primary-400 text-3xl"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins">
              My Favorites
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Your saved events collection - {favoriteEvents.length} event
            {favoriteEvents.length !== 1 ? "s" : ""} saved
          </p>

          {favoriteEvents.length > 0 && (
            <button onClick={clearAllFavorites} className="btn-outline">
              <FontAwesomeIcon icon={faTrash} />
              <span>Clear All Favorites</span>
            </button>
          )}
        </div>

        {/* Favorites Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteEvents.map((event) => (
            <div key={event.id} className="relative group">
              <EventCard event={event} />

              {/* Remove from Favorites Button */}
              <button
                onClick={() => removeFavorite(event.id)}
                className="absolute top-4 right-4 w-10 h-10 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                title="Remove from favorites"
              >
                <FontAwesomeIcon icon={faTrash} className="text-sm" />
              </button>

              {/* Share Button */}
              <button
                onClick={() => {
                  navigator.share
                    ? navigator.share({
                        title: event.name,
                        text: event.shortDescription,
                        url: window.location.origin + `/event/${event.id}`,
                      })
                    : navigator.clipboard.writeText(
                        window.location.origin + `/event/${event.id}`
                      );
                }}
                className="absolute top-4 right-16 w-10 h-10 bg-green-500/80 hover:bg-green-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                title="Share event"
              >
                <FontAwesomeIcon icon={faShare} className="text-sm" />
              </button>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="card-enhanced text-center p-6">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-primary-400 text-3xl mb-4"
            />
            <div className="text-2xl font-bold text-white mb-2">
              {favoriteEvents.length}
            </div>
            <div className="text-gray-400">Favorite Events</div>
          </div>

          <div className="card-enhanced text-center p-6">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-green-400 text-3xl mb-4"
            />
            <div className="text-2xl font-bold text-white mb-2">
              {
                favoriteEvents.filter(
                  (event) => new Date(event.date) > new Date()
                ).length
              }
            </div>
            <div className="text-gray-400">Upcoming Events</div>
          </div>

          <div className="card-enhanced text-center p-6">
            <FontAwesomeIcon
              icon={faUsers}
              className="text-purple-400 text-3xl mb-4"
            />
            <div className="text-2xl font-bold text-white mb-2">
              {
                [...new Set(favoriteEvents.map((event) => event.category))]
                  .length
              }
            </div>
            <div className="text-gray-400">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
