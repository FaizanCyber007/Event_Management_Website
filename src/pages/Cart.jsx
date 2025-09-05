import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faTrash,
  faPlus,
  faMinus,
  faCreditCard,
  faCalendarAlt,
  faMapMarkerAlt,
  faArrowRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    // Get cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Dispatch event to update navbar counter
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const removeFromCart = (eventId) => {
    const updatedCart = cartItems.filter((item) => item.id !== eventId);
    updateCart(updatedCart);
  };

  const updateQuantity = (eventId, change) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === eventId) {
        const newQuantity = Math.max(1, Math.min(10, item.quantity + change));
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    // Dispatch event to update navbar counter
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert(
        "Checkout successful! You will receive confirmation emails shortly."
      );
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-white text-3xl"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-poppins">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Start exploring events and add tickets to your cart to see them
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
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-primary-400 text-3xl"
            />
            <div>
              <h1 className="text-4xl font-bold text-white font-poppins">
                Shopping Cart
              </h1>
              <p className="text-gray-400">
                {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in your
                cart
              </p>
            </div>
          </div>

          {cartItems.length > 0 && (
            <button onClick={clearCart} className="btn-outline">
              <FontAwesomeIcon icon={faTrash} />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="card-enhanced p-6">
                <div className="flex items-start space-x-4">
                  {/* Event Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <span>{item.venue}</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <FontAwesomeIcon icon={faMinus} className="text-xs" />
                        </button>
                        <span className="text-white font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                          disabled={item.quantity >= 10}
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-xs" />
                        </button>
                      </div>

                      <div className="text-primary-400 font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center text-red-400 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-enhanced p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Service Fee</span>
                  <span>${(getTotalPrice() * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Processing Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        getTotalPrice() +
                        getTotalPrice() * 0.05 +
                        2.99
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn-primary w-full mb-4"
              >
                {isCheckingOut ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCreditCard} />
                    <span>Proceed to Checkout</span>
                  </>
                )}
              </button>

              <Link to="/events" className="btn-outline w-full">
                <FontAwesomeIcon icon={faArrowRight} />
                <span>Continue Shopping</span>
              </Link>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm text-center">
                  🔒 Secure checkout with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
