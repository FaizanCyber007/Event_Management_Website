import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventsData } from "../data/events";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaTags,
  FaHeart,
  FaShoppingCart,
  FaArrowLeft,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const EventDetailEnhanced = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const event = eventsData.find((e) => e.id === parseInt(id));

  // Check if event is already in favorites
  useEffect(() => {
    if (event) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.some((fav) => fav.id === event.id));
    }
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Event Not Found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Calculate booking percentage
  const bookingPercentage = Math.round(
    (event.registeredCount / event.capacity) * 100
  );

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  const handleFavoriteToggle = () => {
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

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === event.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...event, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch custom event to update navbar counters
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    alert("Event added to cart!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end">
          <div className="container mx-auto px-6 pb-8">
            <button
              onClick={() => navigate("/")}
              className="mb-4 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <FaArrowLeft /> Back to Events
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {event.name}
            </h1>
            <div className="flex items-center gap-4 text-white">
              <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
              <div className="flex items-center gap-1">
                {renderStars(event.rating)}
                <span className="ml-2">({event.rating})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">
                Event Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaCalendar className="text-green-500" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaClock className="text-green-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaMapMarkerAlt className="text-green-500" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaUser className="text-green-500" />
                  <span>{event.organizer}</span>
                </div>
              </div>

              {/* Booking Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FaChartLine className="text-green-500" />
                    Seat Availability
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaUsers />
                    <span>
                      {event.registeredCount.toLocaleString()} /{" "}
                      {event.capacity.toLocaleString()} registered
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 mb-2">
                  <div
                    className={`h-4 rounded-full transition-all duration-300 ${
                      bookingPercentage >= 90
                        ? "bg-red-500"
                        : bookingPercentage >= 70
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${bookingPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>0%</span>
                  <span className="font-semibold text-white">
                    {bookingPercentage}% Booked
                  </span>
                  <span>100%</span>
                </div>
                {bookingPercentage >= 90 && (
                  <div className="mt-2 p-3 bg-red-900/30 border border-red-600/30 rounded-lg">
                    <p className="text-red-300 text-sm font-medium">
                      ⚠️ Almost Full! Only{" "}
                      {event.capacity - event.registeredCount} seats remaining.
                    </p>
                  </div>
                )}
              </div>

              <p className="text-gray-300 leading-relaxed">
                {event.fullDescription}
              </p>

              {/* Tags */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaTags className="text-green-500" />
                  <span className="font-semibold text-white">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-600/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Reviews & Ratings
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(event.rating)}
                  </div>
                  <span className="text-xl font-bold text-white">
                    {event.rating}
                  </span>
                  <span className="text-gray-400">
                    ({event.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>

              {event.reviews && event.reviews.length > 0 ? (
                <div className="space-y-6">
                  {event.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-slate-700 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">
                              {review.name}
                            </h4>
                            <span className="text-sm text-gray-400">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-gray-300 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No reviews yet. Be the first to review this event!</p>
                </div>
              )}
            </div>

            {/* Map Section */}
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">Location</h2>
              <div className="aspect-video rounded-lg overflow-hidden border border-slate-600">
                <iframe
                  src={event.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map to ${event.venue}`}
                ></iframe>
              </div>
              <div className="mt-4 flex items-center gap-2 text-gray-300">
                <FaMapMarkerAlt className="text-green-500" />
                <span>
                  {event.venue}, {event.location}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 sticky top-6 border border-slate-700">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {event.price}
                </div>
                <p className="text-gray-400">per ticket</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>

                <button
                  onClick={handleFavoriteToggle}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isFavorite
                      ? "bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-600/30"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600 border border-slate-600"
                  }`}
                >
                  <FaHeart className={isFavorite ? "text-red-400" : ""} />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Capacity:</span>
                    <span className="font-semibold text-white">
                      {event.capacity.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Registered:</span>
                    <span className="font-semibold text-white">
                      {event.registeredCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Available:</span>
                    <span className="font-semibold text-green-400">
                      {(
                        event.capacity - event.registeredCount
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Booking Status:</span>
                    <span
                      className={`font-semibold ${
                        bookingPercentage >= 90
                          ? "text-red-400"
                          : bookingPercentage >= 70
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {bookingPercentage >= 90
                        ? "Almost Full"
                        : bookingPercentage >= 70
                        ? "Filling Fast"
                        : "Available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Share This Event
              </h3>
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Facebook
                </button>
                <button className="flex-1 bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors text-sm">
                  Twitter
                </button>
                <button className="flex-1 bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition-colors text-sm">
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailEnhanced;
