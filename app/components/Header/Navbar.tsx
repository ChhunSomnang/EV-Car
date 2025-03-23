"use client";

import NavbarLoginButton from "./nav-bar-buttons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SellingButton from "../buttons/sell-button";
import { useSelector } from "react-redux";
import { RootState } from "app/lib/store";

export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname(); // Get the current route

  const cartItems = useSelector((state: RootState) => state.cart.items); // Access cart items from Redux store

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolledDown = scrollPosition > 0;
  const isNotHome = pathname !== "/"; // Check if the current route is not the homepage

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full shadow-md z-50 transition-all duration-300 ${
          isScrolledDown || isNotHome ? "bg-white text-black" : "bg-transparent text-white"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            EV Car
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">Home</Link>
            <div className="relative group">
              <Link href="/list">
                <button>Electric Cars</button>
              </Link>
            </div>
            <div className="relative group">
              <Link href="/chargingstations">
                <button>Charging Stations</button>
              </Link>
            </div>
            <Link href="/accessories">Accessories</Link>
            <Link href="/garage">Our Garages</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/join-us">Join Us</Link>
            <SellingButton />
            <NavbarLoginButton />

            {/* Cart Icon */}
            <Link href="/cart" className="relative flex items-center space-x-2 text-white">
              <span className="text-xl">🛒</span>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      {pathname === "/" && (
        <div className="relative h-screen bg-gray-100">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://i.pinimg.com/736x/49/08/7c/49087cda310d2dad798b53f5b1817830.jpg')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Drive the Future with Us
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Find your perfect electric car or charging solution today.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-center bg-white text-black py-4 px-6 rounded shadow-lg">
              <select
                className="bg-transparent px-4 py-2 focus:outline-none"
                defaultValue="Electric Cars"
              >
                <option value="Electric Cars">Electric Cars</option>
                <option value="Charging Stations">Charging Stations</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                className="px-4 py-2 w-full border-l border-gray-300 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Brand or Model"
                className="px-4 py-2 w-full border-l border-gray-300 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Features (e.g., fast charging)"
                className="px-4 py-2 w-full focus:outline-none"
              />
              <button className="bg-sky-400 text-white px-6 py-2 rounded shadow">
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
