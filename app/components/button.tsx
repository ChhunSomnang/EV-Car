import React from 'react';

const AddToCartButton: React.FC = () => {
  const handleAddToCart = () => {
    // Add your "Add to Cart" functionality here
    console.log('Item added to cart!');
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
