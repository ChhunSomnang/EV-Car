import React from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarSearchbar from "./NavbarSearchbar";
import User from "./User";

const Navbar = () => {
  return (
    <div className="p-4 w-full fixed top-0 left-0 py-4 border-b bg-white z-10 drop-shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <NavbarLogo />
        <div className="flex w-full sm:w-auto justify-center sm:justify-start mt-4 sm:mt-0">
          <NavbarSearchbar />
        </div>
        <div className="mt-4 sm:mt-0">
          <User />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
