"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { SignupButton } from "../buttons/signup-button";
import { LoginButton } from "../buttons/login-button";
import { LogoutButton } from "../buttons/logout-button";
import Image from "next/image"; // Import the Image component from Next.js

export const NavBarButtons = () => {
  const { user, isLoading } = useUser();  // Get the `isLoading` state as well

  if (isLoading) {
    return <div>Loading...</div>;  // Show loading state while the user data is being fetched
  }

  return (
    <div className="nav-bar__buttons">
      {!user ? (
        <>
          <SignupButton />
          <LoginButton />
        </>
      ) : (
        <>
          <Image
            src={user.picture || "/default-avatar.png"}  // Fallback to a default image if no picture is available
            alt="profile"
            width={45}
            height={45}
          />
          <LogoutButton />
        </>
      )}
    </div>
  );
};
