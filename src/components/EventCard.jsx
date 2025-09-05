import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faClock,
  faUsers,
  faArrowRight,
  faDollarSign,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const EventCard = ({ event }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    // Check if event is in favorites
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav) => fav.id === event.id));

    // Check if event is in cart
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsInCart(cartItems.some((item) => item.id === event.id));
  }, [event.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== event.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(event);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }

    // Dispatch custom event to update navbar counters
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  };

  const addToCart = () => {
    if (isInCart) {
      alert("Event is already in your cart!");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    cartItems.push({ ...event, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setIsInCart(true);

    // Dispatch custom event to update navbar counters
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    alert("Event added to cart!");
  };
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getProgressPercentage = () => {
    return Math.round((event.registeredCount / event.capacity) * 100);
  };

  return (
    <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 transform hover:-translate-y-2 card-3d">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-primary-400/50">
            {event.category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center space-x-1">
            <FontAwesomeIcon icon={faDollarSign} className="text-xs" />
            <span className="text-sm font-bold">{event.price}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={toggleFavorite}
            className={`w-10 h-10 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-300 ${
              isFavorite
                ? "bg-pink-500/80 border-pink-400 text-white"
                : "bg-black/50 border-white/20 text-white hover:bg-pink-500/50"
            }`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FontAwesomeIcon icon={faHeart} className="text-sm" />
          </button>

          <button
            onClick={addToCart}
            className={`w-10 h-10 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-300 ${
              isInCart
                ? "bg-green-500/80 border-green-400 text-white"
                : "bg-black/50 border-white/20 text-white hover:bg-primary-500/50"
            }`}
            title={isInCart ? "Added to cart" : "Add to cart"}
            disabled={isInCart}
          >
            <FontAwesomeIcon
              icon={isInCart ? faUsers : faShoppingCart}
              className="text-sm"
            />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative p-6 space-y-4">
        {/* Event Title */}
        <h3 className="text-xl font-bold font-poppins text-white group-hover:text-primary-300 transition-colors duration-300">
          {event.name}
        </h3>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-gray-300">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-primary-400 w-4"
            />
            <span className="text-sm font-inter">{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <FontAwesomeIcon icon={faClock} className="text-primary-400 w-4" />
            <span className="text-sm font-inter">{event.time}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-primary-400 w-4"
            />
            <span className="text-sm font-inter truncate">{event.venue}</span>
          </div>
        </div>

        {/* Event Description */}
        <p className="text-gray-300 text-sm font-inter leading-relaxed line-clamp-2">
          {event.shortDescription}
        </p>

        {/* Registration Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-300">
              <FontAwesomeIcon icon={faUsers} className="text-primary-400" />
              <span className="font-inter">
                {event.registeredCount} registered
              </span>
            </div>
            <span className="text-gray-400 font-inter">
              {getProgressPercentage()}% full
            </span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-400 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 backdrop-blur-sm text-xs text-gray-300 rounded-md border border-white/20"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="px-2 py-1 bg-white/10 backdrop-blur-sm text-xs text-gray-400 rounded-md border border-white/20">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            to={`/event/${event.id}`}
            className="btn-primary w-full justify-center"
          >
            <span>Learn More</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-sm transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-400 rounded-full opacity-20 animate-ping"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full opacity-30 animate-bounce-slow"></div>
    </div>
  );
};

export default EventCard;
