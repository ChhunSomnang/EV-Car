"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../lib/features/store/cartSlice";
import { AppDispatch } from "../lib/store";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
