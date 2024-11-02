// ProductList.tsx
import React from 'react';
import data from '../assets/alldata.json';
import ProductCard from '../components/ProductCard';

interface Item {
  id: number;
  name: string;
  model: string;
  category: string;
  modelImage?: string; // Make modelImage optional
  brand: string;
  price: number;
  condition: string;
  rating?: number; // Make rating optional
}

const ProductList: React.FC = () => {
  // Create a mapped array to match the Item structure
  const products: Item[] = data.allcars.slice(0, 4).map(item => ({
    id: item.id,
    name: item.name,
    model: item.model,
    category: item.category,
    modelImage: item.modelImage, // Provide a default image URL if undefined
    brand: item.brand,
    price: item.price,
    condition: item.condition,
    rating: item.rating,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
