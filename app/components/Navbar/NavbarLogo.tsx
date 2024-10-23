import Link from "next/link";
import React from "react";

const NavbarLogo = () => {
  return (
    <Link href='/'>
    <div className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
      Store<span className="text-store">24</span>
    </div>
    </Link>
  );
};

export default NavbarLogo;
