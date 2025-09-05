import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faUsers,
  faShieldAlt,
  faHeadset,
  faMobile,
  faCloud,
  faChartLine,
  faCog,
  faGlobe,
  faLightbulb,
  faTrophy,
  faHandshake,
  faCamera,
  faMusic,
  faGamepad,
  faUtensils,
  faPalette,
  faRunning,
  faGraduationCap,
  faBuilding,
  faHeart,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

const AdditionalSections = () => {
  const features = [
    {
      icon: faRocket,
      title: "Easy Event Discovery",
      description:
        "Find events tailored to your interests with our advanced search and recommendation system.",
    },
    {
      icon: faUsers,
      title: "Community Driven",
      description:
        "Connect with like-minded individuals and build lasting relationships through shared experiences.",
    },
    {
      icon: faShieldAlt,
      title: "Secure Booking",
      description:
        "Your data and payments are protected with enterprise-grade security and encryption.",
    },
    {
      icon: faHeadset,
      title: "24/7 Support",
      description:
        "Our dedicated support team is always ready to help you with any questions or issues.",
    },
    {
      icon: faMobile,
      title: "Mobile Ready",
      description:
        "Access events on-the-go with our responsive design that works perfectly on all devices.",
    },
    {
      icon: faCloud,
      title: "Cloud Sync",
      description:
        "Your bookings and preferences sync across all devices, so you never miss an update.",
    },
  ];

  const eventTypes = [
    { icon: faMusic, name: "Music & Concerts", count: "150+" },
    { icon: faGamepad, name: "Gaming & Esports", count: "85+" },
    { icon: faUtensils, name: "Food & Dining", count: "200+" },
    { icon: faPalette, name: "Art & Culture", count: "120+" },
    { icon: faRunning, name: "Sports & Fitness", count: "180+" },
    { icon: faGraduationCap, name: "Education & Learning", count: "95+" },
    { icon: faBuilding, name: "Business & Networking", count: "140+" },
    { icon: faHeart, name: "Health & Wellness", count: "75+" },
  ];

  const services = [
    {
      icon: faChartLine,
      title: "Event Analytics",
      description:
        "Track event performance and attendee engagement with detailed analytics.",
    },
    {
      icon: faCog,
      title: "Event Management",
      description:
        "Comprehensive tools for organizers to create and manage successful events.",
    },
    {
      icon: faGlobe,
      title: "Global Reach",
      description: "Connect with events and attendees from around the world.",
    },
    {
      icon: faLightbulb,
      title: "Innovation Hub",
      description:
        "Discover cutting-edge events that showcase the latest trends and innovations.",
    },
  ];

  const achievements = [
    {
      icon: faTrophy,
      title: "Award Winning",
      subtitle: "Best Event Platform 2024",
    },
    {
      icon: faHandshake,
      title: "Trusted Partners",
      subtitle: "500+ Event Organizers",
    },
    { icon: faUsers, title: "Growing Community", subtitle: "1M+ Active Users" },
    { icon: faLeaf, title: "Eco Friendly", subtitle: "Carbon Neutral Events" },
  ];

  return (
    <div className="space-y-24 py-24">
      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-glow font-poppins mb-6">
            Why Choose <span className="text-primary-400">EventSphere</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of event discovery with our cutting-edge
            platform designed for modern event enthusiasts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-enhanced group hover:shadow-primary text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-poppins">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Event Types Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-glow font-poppins mb-6">
            Explore Event <span className="text-primary-400">Categories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From intimate workshops to massive festivals, discover events that
            match your passion and interests.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {eventTypes.map((type, index) => (
            <Link
              key={index}
              to={`/events?category=${encodeURIComponent(type.name)}`}
              className="card-enhanced group text-center hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <FontAwesomeIcon
                  icon={type.icon}
                  className="text-white text-xl icon-bounce"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {type.name}
              </h3>
              <span className="text-primary-400 font-bold">{type.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-glow font-poppins mb-6">
            Our <span className="text-primary-400">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions for both event attendees and organizers to
            create memorable experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-enhanced group text-center hover:shadow-blue"
            >
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={service.icon}
                  className="text-white text-xl"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-glow font-poppins mb-6">
            Our <span className="text-primary-400">Achievements</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Recognized excellence in the event industry with awards and
            milestones that showcase our commitment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="card-enhanced group text-center hover:shadow-purple"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={achievement.icon}
                  className="text-white text-2xl icon-pulse"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {achievement.title}
              </h3>
              <p className="text-primary-400 font-semibold">
                {achievement.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-enhanced text-center py-16 bg-gradient-to-r from-primary-500/10 to-blue-500/10">
          <h2 className="text-4xl md:text-5xl font-bold text-glow font-poppins mb-6">
            Ready to Start Your{" "}
            <span className="text-primary-400">Journey</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of event enthusiasts who have discovered their next
            great experience with EventSphere.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/events" className="btn-primary">
              <FontAwesomeIcon icon={faCamera} />
              <span>Browse Events</span>
            </Link>
            <Link to="/contact" className="btn-outline">
              <FontAwesomeIcon icon={faHeadset} />
              <span>Get Support</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdditionalSections;
