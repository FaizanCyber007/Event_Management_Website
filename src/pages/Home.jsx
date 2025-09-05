import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarAlt,
  faUsers,
  faMapMarkerAlt,
  faStar,
  faQuoteLeft,
  faEye,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import AdditionalSections from "../components/AdditionalSections";
import { featuredEvents, eventCategories } from "../data/events";

const Home = () => {
  const [filteredEvents, setFilteredEvents] = useState(featuredEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter events based on search and category
  useEffect(() => {
    let filtered = featuredEvents;

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.shortDescription
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Tech Entrepreneur",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612c495?w=100&h=100&fit=crop&crop=face",
      content:
        "EventSphere helped me discover the most amazing tech conferences. The platform is intuitive and the events are top-notch!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Music Producer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content:
        "Found incredible music events and networking opportunities. The user experience is fantastic and booking is seamless.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content:
        "The variety of events and the detailed information provided makes planning so much easier. Highly recommended!",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: faCalendarAlt,
      title: "Curated Events",
      description:
        "Hand-picked events from verified organizers ensuring quality experiences.",
      color: "text-primary-400",
    },
    {
      icon: faUsers,
      title: "Community Driven",
      description:
        "Connect with like-minded individuals and build lasting professional relationships.",
      color: "text-blue-400",
    },
    {
      icon: faMapMarkerAlt,
      title: "Global Reach",
      description:
        "Discover events happening in your city or explore opportunities worldwide.",
      color: "text-purple-400",
    },
    {
      icon: faStar,
      title: "Premium Experience",
      description:
        "Enjoy seamless booking, detailed information, and exceptional customer support.",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Search Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-poppins gradient-text mb-4">
              Find Your Perfect Event
            </h2>
            <p className="text-xl text-gray-300 font-inter max-w-2xl mx-auto">
              Search through thousands of events and filter by your interests
            </p>
          </div>

          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            categories={eventCategories}
          />
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-blue-500 rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">
              Featured <span className="gradient-text">Events</span>
            </h2>
            <p className="text-xl text-gray-300 font-inter max-w-3xl mx-auto leading-relaxed">
              Discover the most popular and trending events happening near you
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredEvents.map((event) => (
              <div key={event.id} className="animate-scale-in">
                <EventCard event={event} />
              </div>
            ))}
          </div>

          {/* View All Events Button */}
          <div className="text-center">
            <Link to="/events" className="btn-primary">
              <FontAwesomeIcon icon={faEye} />
              <span>View All Events</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800/50 to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">
              Why Choose <span className="gradient-text">EventSphere</span>
            </h2>
            <p className="text-xl text-gray-300 font-inter max-w-3xl mx-auto leading-relaxed">
              We're committed to providing the best event discovery and booking
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center space-y-4 p-6 rounded-2xl glass hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mx-auto group-hover:bg-white/20 transition-colors duration-300">
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className={`text-2xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <h3 className="text-xl font-bold font-poppins text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 font-inter leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-1/4 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-purple-500 rounded-full blur-2xl animate-bounce-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">
              What Our <span className="gradient-text">Users Say</span>
            </h2>
            <p className="text-xl text-gray-300 font-inter max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Quote Icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-full mb-6">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    className="text-primary-400 text-xl"
                  />
                </div>

                {/* Testimonial Content */}
                <p className="text-gray-300 font-inter leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="text-yellow-400"
                    />
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold font-poppins">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm font-inter">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <AdditionalSections />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-500 to-blue-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">
            Ready to Discover Your Next Experience?
          </h2>
          <p className="text-xl text-white/90 font-inter mb-8 leading-relaxed">
            Join thousands of event enthusiasts and never miss out on amazing
            opportunities again
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/events" className="btn-secondary">
              <FontAwesomeIcon icon={faTicketAlt} />
              <span>Start Exploring</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link to="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
