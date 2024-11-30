import Link from "next/link";
import React from "react";

const SellButton = () => {
  return (
    <div className="flex justify-center items-center ">
      <Link href="/sell">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Sell
        </button>
      </Link>
    </div>
  );
};

export default SellButton;
