import Link from "next/link";
import React from "react";

const User = () => {
  return (
    <div className="flex items-center space-x-4">
      {" "}
      {/* Increased space between items */}
      <Link href="/login">
        <div className="flex items-center font-semibold text-store hover:cursor-pointer text-lg sm:text-xl transition duration-200 ease-in-out hover:text-blue-500">
          <svg
            className="h-6 w-6 text-store mr-2 transition duration-200 ease-in-out hover:text-blue-500" // Consistent icon size and hover color
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Login icon" // Accessibility label
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Login</span>
        </div>
      </Link>
      <span className="text-gray-400">or</span>
      <Link href="/register">
        <div className="flex items-center font-semibold text-store hover:cursor-pointer text-lg sm:text-xl transition duration-200 ease-in-out hover:text-blue-500">
          <svg
            className="h-6 w-6 text-store mr-2 transition duration-200 ease-in-out hover:text-blue-500" // Consistent icon size and hover color
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Register icon" // Accessibility label
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          <span>Register</span>
        </div>
      </Link>
    </div>
  );
};

export default User;
