"use client";
import Image from "next/image";
import React, { useState } from "react";

interface CarImage {
  id: number;
  url: string;
}

interface ProductImageProps {
  items: CarImage[]; // Expect an array of CarImage
}

const ProductImage: React.FC<ProductImageProps> = ({ items }) => {
  const [index, setIndex] = useState(0);

  if (!items.length) return <p>No images available.</p>;

  return (
    <div>
      <div className="h-[500px] w-full relative">
        <Image
          src={items[index].url}
          alt={`Car image ${index + 1}`}
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      
      <div className="flex justify-between gap-4 mt-8">
        {items.map(({ id, url }, i) => (
          <div
            className="w-1/4 h-32 relative cursor-pointer"
            key={id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={url}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
