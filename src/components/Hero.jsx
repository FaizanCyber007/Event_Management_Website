import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUsers,
  faMapMarkerAlt,
  faArrowRight,
  faPlay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop",
  ];

  const stats = [
    { number: "10K+", label: "Happy Attendees", icon: faUsers },
    { number: "500+", label: "Events Hosted", icon: faCalendarAlt },
    { number: "50+", label: "Cities Covered", icon: faMapMarkerAlt },
    { number: "4.9", label: "Average Rating", icon: faStar },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Parallax */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${
                mousePosition.y * -0.02
              }px) scale(1.1)`,
            }}
          >
            <img
              src={image}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce-slow opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-purple-400 rounded-full animate-pulse-slow opacity-50"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-float opacity-70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-tight">
              <span className="gradient-text">Discover</span>{" "}
              <span className="text-white">Upcoming</span>
              <br />
              <span className="text-white">Events</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-inter max-w-3xl mx-auto leading-relaxed">
              Experience the world's most amazing events, from tech conferences
              to music festivals. Your next unforgettable experience is just a
              click away.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link to="/events" className="btn-primary">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Explore Events</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <button className="btn-glass group">
              <FontAwesomeIcon icon={faPlay} className="text-primary-400" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="pt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group glass rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-full mx-auto mb-4 group-hover:bg-primary-500/30 transition-colors duration-300">
                    <FontAwesomeIcon
                      icon={stat.icon}
                      className="text-primary-400 text-xl group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-3xl font-bold font-poppins gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-inter text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-400 shadow-lg"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white/50 animate-bounce-slow">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-inter rotate-90 origin-center">
            Scroll
          </span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-primary-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
