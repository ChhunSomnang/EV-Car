import React from "react";
import Menu from "../components/Menu";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div className="flex justify-center pt-28 my-10">
        <Image
          src="https://i.pinimg.com/564x/68/b7/f0/68b7f0a20dde6d9c04d99c2efd47740b.jpg"
          alt=""
          width={500}
          height={500}
          className="w-[500px] h-[200px] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl "
        />
      </div>
      <div className="ml-14">
        <Menu />
      </div>
    </div>
  );
};

export default page;
