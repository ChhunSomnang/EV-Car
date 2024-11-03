import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center h-screen mt-32 space-y-6">
      <div className="font-semibold text-3xl text-gray-800">Register</div>
      <div className="flex flex-col justify-center p-8 bg-white border border-gray-300 rounded-lg shadow-lg space-y-6 w-[500px]">
        <div className="flex items-center border-2 rounded-md h-12 px-4 focus-within:border-blue-500 transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Name"
            className="w-full focus:outline-none"
          />
        </div>

        <div className="flex items-center border-2 rounded-md h-12 px-4 focus-within:border-blue-500 transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
            />
          </svg>

          <input
            type="email"
            placeholder="Email@gmail.com"
            className="w-full focus:outline-none"
          />
        </div>

        <div className="flex items-center border-2 rounded-md h-12 px-4 focus-within:border-blue-500 transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>

          <input
            type="password"
            placeholder="Password"
            className="w-full focus:outline-none"
          />
        </div>

        <div className="flex items-center border-2 rounded-md h-12 px-4 focus-within:border-blue-500 transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <input type="checkbox" className="w-4 h-4" />
          <label className="text-gray-600">
            I Agree with the{" "}
            <span className="text-store hover:cursor-pointer">Privacy </span>{" "}
            and <span className="text-store hover:cursor-pointer">Policy</span>
          </label>
        </div>
        <button className="bg-blue-500 text-white font-semibold py-3 rounded-md w-full hover:bg-blue-600 transition duration-200">
          Register
        </button>
        <div className="flex items-center space-x-2 justify-center text-gray-600">
          Already have an account ?
          <Link href="/login">
            <span className="text-store hover:underline px-2">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
