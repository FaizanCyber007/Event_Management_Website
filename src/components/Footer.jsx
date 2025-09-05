import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: faFacebook, url: "#", color: "hover:text-blue-500" },
    { icon: faTwitter, url: "#", color: "hover:text-blue-400" },
    { icon: faInstagram, url: "#", color: "hover:text-pink-500" },
    { icon: faLinkedin, url: "#", color: "hover:text-blue-600" },
    { icon: faYoutube, url: "#", color: "hover:text-red-500" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Upcoming Events", path: "/events" },
    { name: "Contact", path: "/contact" },
    { name: "About Us", path: "/about" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];

  const eventCategories = [
    "Technology",
    "Music",
    "Business",
    "Food & Drink",
    "Arts & Culture",
    "Health & Fitness",
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-500 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-purple-500 rounded-full blur-xl animate-bounce-slow"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-2xl text-primary-400 float"
                  />
                  <div className="absolute -inset-1 bg-primary-400 rounded-full opacity-20 blur-sm"></div>
                </div>
                <h3 className="text-2xl font-bold font-poppins gradient-text">
                  EventSphere
                </h3>
              </div>
              <p className="text-gray-300 font-inter leading-relaxed">
                Discover and explore amazing events happening around you. From
                tech conferences to music festivals, we bring you the best
                experiences.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-300">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-primary-400"
                  />
                  <span className="font-inter">San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-primary-400"
                  />
                  <span className="font-inter">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-primary-400"
                  />
                  <span className="font-inter">hello@eventsphere.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold font-poppins text-white">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-primary-400 font-inter transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Event Categories */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold font-poppins text-white">
                Event Categories
              </h4>
              <ul className="space-y-3">
                {eventCategories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={`/events?category=${category
                        .toLowerCase()
                        .replace(/ & /g, "-")
                        .replace(/ /g, "-")}`}
                      className="text-gray-300 hover:text-primary-400 font-inter transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold font-poppins text-white">
                Stay Connected
              </h4>
              <p className="text-gray-300 font-inter">
                Subscribe to our newsletter for the latest events and updates.
              </p>

              {/* Newsletter Signup */}
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-semibold font-inter hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Subscribe
                </button>
              </form>

              {/* Social Media Links */}
              <div className="space-y-4">
                <h5 className="text-lg font-medium font-poppins text-white">
                  Follow Us
                </h5>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/20`}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 font-inter">
                  © {currentYear} EventSphere. All rights reserved.
                </p>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 glow-green"
                aria-label="Back to top"
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
