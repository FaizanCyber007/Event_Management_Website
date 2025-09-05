import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faClock,
  faUsers,
  faShare,
  faHeart,
  faArrowLeft,
  faExternalLinkAlt,
  faTicketAlt,
  faUser,
  faEnvelope,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { eventsData } from "../data/events";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const foundEvent = eventsData.find((e) => e.id === parseInt(id));
      setEvent(foundEvent);
      setLoading(false);
    }, 500);
  }, [id]);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getProgressPercentage = () => {
    if (!event) return 0;
    return Math.round((event.registeredCount / event.capacity) * 100);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: event.shortDescription,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert("Event URL copied to clipboard!");
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    console.log("Registration data:", registrationData);
    alert(
      "Registration successful! You will receive a confirmation email shortly."
    );
    setShowRegistrationModal(false);
    setRegistrationData({ name: "", email: "", phone: "", tickets: 1 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center max-w-md mx-auto">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300 font-inter">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            Event Not Found
          </h2>
          <p className="text-gray-300 font-inter mb-6">
            The event you're looking for doesn't exist.
          </p>
          <Link
            to="/events"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300"
          >
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="font-inter">Back to Events</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Event Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
                    {event.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-full transition-colors duration-300 ${
                        isLiked
                          ? "bg-red-500 text-white"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faShare} />
                    </button>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white">
                  {event.name}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-primary-400"
                    />
                    <span className="font-inter">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-primary-400"
                    />
                    <span className="font-inter">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-primary-400"
                    />
                    <span className="font-inter">{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 min-w-fit">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">
                    {event.price}
                  </div>
                  <button
                    onClick={() => setShowRegistrationModal(true)}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Description */}
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold font-poppins text-white mb-6">
                  About This Event
                </h2>
                <p className="text-gray-300 font-inter leading-relaxed text-lg">
                  {event.fullDescription}
                </p>
              </div>

              {/* Event Tags */}
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold font-poppins text-white mb-4">
                  Event Tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary-500/20 border border-primary-500/30 text-primary-300 rounded-lg font-inter text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location Map */}
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold font-poppins text-white">
                    Event Location
                  </h3>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      event.venue + ", " + event.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-300"
                  >
                    <span className="font-inter">Open in Google Maps</span>
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </a>
                </div>

                <div className="bg-gray-800 rounded-lg h-64 overflow-hidden">
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

                <div className="mt-4 text-gray-300 font-inter">
                  <p className="font-semibold">{event.venue}</p>
                  <p>{event.location}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Event Stats */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold font-poppins text-white mb-6">
                  Event Stats
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="text-primary-400"
                      />
                      <span className="text-gray-300 font-inter">
                        Registered
                      </span>
                    </div>
                    <span className="text-white font-semibold">
                      {event.registeredCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faTicketAlt}
                        className="text-primary-400"
                      />
                      <span className="text-gray-300 font-inter">Capacity</span>
                    </div>
                    <span className="text-white font-semibold">
                      {event.capacity}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-inter">
                        Availability
                      </span>
                      <span className="text-gray-300 font-inter">
                        {getProgressPercentage()}% full
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-400 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${getProgressPercentage()}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organizer Info */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold font-poppins text-white mb-6">
                  Organizer
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-primary-400"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold font-poppins">
                        {event.organizer}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="text-yellow-400 text-xs"
                          />
                        ))}
                        <span className="text-gray-400 text-sm font-inter ml-2">
                          4.9/5
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <span className="font-inter">Contact Organizer</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold font-poppins text-white mb-6">
                  Quick Actions
                </h3>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowRegistrationModal(true)}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                  >
                    Register Now
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Share Event
                  </button>

                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-300 ${
                      isLiked
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    {isLiked ? "Remove from Favorites" : "Add to Favorites"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold font-poppins text-white">
                Register for Event
              </h3>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleRegistration} className="space-y-4">
              <div>
                <label className="block text-gray-300 font-inter mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={registrationData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-inter mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-inter mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={registrationData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-inter mb-2">
                  Number of Tickets
                </label>
                <select
                  name="tickets"
                  value={registrationData.tickets}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-slate-800">
                      {i + 1} {i === 0 ? "Ticket" : "Tickets"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300 font-inter">
                    Total Amount:
                  </span>
                  <span className="text-2xl font-bold text-primary-400">
                    $
                    {parseInt(event.price.replace("$", "")) *
                      registrationData.tickets}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-lg font-bold hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
