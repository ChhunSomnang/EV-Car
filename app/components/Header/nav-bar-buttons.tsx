"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, useEffect } from "react";
import { LoginButton } from "../buttons/login-button";
import { LogoutButton } from "../buttons/logout-button";
import Image from "next/image";

export const NavBarButtons = () => {
  const { user, isLoading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      {!user ? (
        <LoginButton />
      ) : (
        <div className="flex items-center space-x-4">
          {/* User Avatar */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none dropdown"
            aria-expanded={isMenuOpen}
            aria-label="User menu"
          >
            <Image
              src={user.picture || "/default-avatar.png"}
              alt="User profile"
              width={45}
              height={45}
              className="rounded-full border border-gray-300"
            />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div
              className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 animate-fade-in dropdown"
              role="menu"
              aria-label="User menu dropdown"
            >
              <a
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Profile
              </a>
              <LogoutButton />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
