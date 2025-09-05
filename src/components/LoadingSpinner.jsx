import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div
          className={`${sizes[size]} border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="text-primary-400 text-xs animate-pulse"
          />
        </div>
      </div>
      {text && <p className="text-gray-300 font-inter text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
