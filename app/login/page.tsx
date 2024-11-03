import React from "react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center h-screen mt-32 space-y-6">
      <div className="font-semibold text-3xl text-gray-800">Login</div>
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
              d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
            />
          </svg>
          <input
            type="email"
            placeholder="Email@gmail.com"
            aria-label="Email"
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
            aria-label="Password"
            className="w-full focus:outline-none"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" id="remember" />
            <label htmlFor="remember" className="text-gray-600">Remember me</label>
          </div>
          <Link href="/forgot-password" className="text-blue-500 hover:underline">
            Forget Password
          </Link>
        </div>
        
        <button className="bg-blue-500 text-white font-semibold py-3 rounded-md w-full hover:bg-blue-600 transition duration-200">
          Login
        </button>
        
        <div className="flex items-center space-x-2 justify-center text-gray-600">
          Don&apos;t have an account?
          <Link href="/register">
            <span className="text-blue-500 hover:underline cursor-pointer px-2">
              Register
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
