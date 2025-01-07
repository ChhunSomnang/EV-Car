import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-center pt-28 my-10">
      <Image
        src="https://i.pinimg.com/564x/44/fb/2d/44fb2d03ef41162f0124e9bedb18cc5e.jpg"
        alt="Store24 Banner"
        width={1144}
        height={369}
        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl h-auto"
      />
    </div>
  );
};

export default Banner;
