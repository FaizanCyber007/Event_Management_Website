import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCalendarAlt,
  faHome,
  faEnvelope,
  faTicketAlt,
  faUser,
  faSearch,
  faBell,
  faHeart,
  faShoppingCart,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check for user login
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Update cart count
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));

    // Update favorites count
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavCount(favorites.length);

    // Listen for cart and favorites updates
    const handleCartUpdate = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    };

    const handleFavoritesUpdate = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavCount(favorites.length);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: faHome },
    { name: "Events", path: "/events", icon: faCalendarAlt },
    { name: "Contact", path: "/contact", icon: faEnvelope },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  return (
    <>
      <nav className={`navbar-enhanced ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <FontAwesomeIcon
                  icon={faTicketAlt}
                  className="text-white text-lg icon-pulse"
                />
              </div>
              <div className="text-xl font-bold text-glow font-poppins">
                Event<span className="text-primary-400">Sphere</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 ${
                    isActive(item.path)
                      ? "text-primary-400 bg-white/10"
                      : "text-white hover:text-primary-400"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-sm" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="btn-icon relative"
                onClick={handleSearchClick}
                title="Search Events"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>

              <button
                className="btn-icon relative"
                onClick={() => alert("Notifications feature coming soon!")}
                title="Notifications"
              >
                <FontAwesomeIcon icon={faBell} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              <Link
                to="/favorites"
                className="btn-icon relative"
                title="Favorites"
              >
                <FontAwesomeIcon icon={faHeart} />
                {favCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                    {favCount > 9 ? "9+" : favCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="btn-icon relative"
                title="Shopping Cart"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative group">
                  <button className="btn-glass">
                    <FontAwesomeIcon icon={faUser} />
                    <span>{user.name.split(" ")[0]}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="p-4 border-b border-gray-700">
                      <p className="text-white font-semibold">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/my-events"
                        className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                      >
                        My Events
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login" className="btn-glass">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Login</span>
                  </Link>
                  <Link to="/signup" className="btn-primary">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="btn-icon">
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-4 pt-2 pb-3 space-y-2 bg-black/20 backdrop-blur-lg border-t border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-primary-400 bg-white/10"
                    : "text-white hover:text-primary-400 hover:bg-white/5"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="border-t border-white/10 pt-4 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setShowSearchModal(true);
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 text-white hover:text-primary-400 text-sm"
              >
                <FontAwesomeIcon icon={faSearch} />
                <span>Search Events</span>
              </button>
              <Link
                to="/favorites"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-white hover:text-primary-400 text-sm"
              >
                <FontAwesomeIcon icon={faHeart} />
                <span>Favorites</span>
                {favCount > 0 && (
                  <span className="ml-auto text-xs bg-pink-500 text-white rounded-full px-2 py-1">
                    {favCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-white hover:text-primary-400 text-sm"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="ml-auto text-xs bg-primary-500 text-white rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-white hover:text-primary-400 text-sm"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Sign Out ({user.name.split(" ")[0]})</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 px-4 py-3 text-white hover:text-primary-400 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-3 px-4 py-3 text-primary-400 hover:text-primary-300 text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </>
  );
};

export default Navbar;
