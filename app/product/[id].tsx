import React from "react";
import { useRouter } from "next/router";
import data from "../assets/alldata.json"; // Import your JSON data

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the product by id from the data
  const product = data.allcars.find((item) => item.id === parseInt(id as string));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        <img
          src={product.modelImage}
          alt={product.model}
          className="w-1/2 h-96 object-cover rounded-lg shadow-md"
        />
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-gray-800">{product.model}</h1>
          <p className="text-xl text-gray-600 mt-2">{product.category}</p>
          <p className="text-2xl text-gray-800 font-bold mt-4">{`Price: $${product.price}`}</p>
          <p className="text-lg text-gray-600 mt-2">{`Condition: ${product.condition}`}</p>
          <div className="flex items-center mt-4">
            {[...Array(product.rating || 0)].map((_, index) => (
              <svg
                key={index}
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927a1 1 0 011.902 0l1.398 3.732a1 1 0 00.9.664l3.646.308a1 1 0 01.591 1.77l-2.77 2.14a1 1 0 00-.322 1.02l1.017 3.774a1 1 0 01-1.516 1.096l-3.171-2.1a1 1 0 00-1.112 0l-3.171 2.1a1 1 0 01-1.516-1.096l1.017-3.774a1 1 0 00-.322-1.02l-2.77-2.14a1 1 0 01.591-1.77l3.646-.308a1 1 0 00.9-.664l1.398-3.732z" />
              </svg>
            ))}
          </div>
          <button
            onClick={() => router.back()}
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
