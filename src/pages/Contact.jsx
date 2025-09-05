import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faUser,
  faTag,
  faComments,
  faClock,
  faQuestionCircle,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: "Email Us",
      content: "hello@eventsphere.com",
      description: "Send us an email anytime",
      color: "text-primary-400",
    },
    {
      icon: faPhone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "24/7 customer support",
      color: "text-blue-400",
    },
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      content: "123 Event Street, San Francisco, CA 94102",
      description: "Our headquarters",
      color: "text-purple-400",
    },
    {
      icon: faClock,
      title: "Business Hours",
      content: "Mon - Fri: 9AM - 6PM PST",
      description: "Weekend support available",
      color: "text-yellow-400",
    },
  ];

  const faqItems = [
    {
      question: "How do I register for an event?",
      answer:
        'Simply browse our events page, find an event you like, and click "Register Now". Fill out the registration form and complete the payment process.',
    },
    {
      question: "Can I get a refund if I can't attend?",
      answer:
        "Refund policies vary by event. Please check the specific event details or contact the organizer directly for refund information.",
    },
    {
      question: "How do I become an event organizer?",
      answer:
        "Contact our team through this form or email us directly. We'll guide you through the process of listing your events on EventSphere.",
    },
    {
      question: "Do you offer group discounts?",
      answer:
        "Many events offer group discounts for 5+ attendees. Check the event details or contact the organizer for group pricing information.",
    },
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
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 font-inter max-w-3xl mx-auto leading-relaxed">
            Have questions about our events? Need help with registration? Our
            team is here to help you make the most of your EventSphere
            experience.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={info.icon}
                    className={`text-2xl ${info.color}`}
                  />
                </div>
                <h3 className="text-lg font-bold font-poppins text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-300 font-inter font-semibold mb-1">
                  {info.content}
                </p>
                <p className="text-gray-400 font-inter text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass rounded-2xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold font-poppins text-white mb-4">
                  Send us a Message
                </h2>
                <p className="text-gray-300 font-inter leading-relaxed">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-300 font-inter">
                    Thank you! Your message has been sent successfully. We'll
                    get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-inter mb-2">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="mr-2 text-primary-400"
                      />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-inter mb-2">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="mr-2 text-primary-400"
                      />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-inter mb-2">
                    <FontAwesomeIcon
                      icon={faTag}
                      className="mr-2 text-primary-400"
                    />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-inter mb-2">
                    <FontAwesomeIcon
                      icon={faComments}
                      className="mr-2 text-primary-400"
                    />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 px-6 rounded-lg font-bold font-inter transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8">
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faQuestionCircle}
                      className="text-primary-400 text-xl"
                    />
                  </div>
                  <h2 className="text-3xl font-bold font-poppins text-white">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-6">
                  {faqItems.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
                    >
                      <h3 className="text-lg font-semibold font-poppins text-white mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-300 font-inter leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Support */}
              <div className="glass rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faHeadset}
                    className="text-blue-400 text-2xl"
                  />
                </div>
                <h3 className="text-xl font-bold font-poppins text-white mb-4">
                  Need Immediate Help?
                </h3>
                <p className="text-gray-300 font-inter mb-6">
                  Our support team is available 24/7 to assist you with any
                  urgent matters.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+15551234567"
                    className="block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Call Now: +1 (555) 123-4567
                  </a>
                  <a
                    href="mailto:support@eventsphere.com"
                    className="block bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-poppins text-white mb-6">
              Visit Our <span className="gradient-text">Office</span>
            </h2>
            <p className="text-xl text-gray-300 font-inter max-w-3xl mx-auto">
              Located in the heart of San Francisco, our office is always open
              for meetings and consultations.
            </p>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="bg-gray-800 rounded-lg h-96 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.8934324541944!2d-122.4054!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1635789456123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EventSphere Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
