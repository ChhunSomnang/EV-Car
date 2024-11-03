"use client";
import React, { useEffect, useState } from 'react';
import data from '../assets/alldata.json';
import ProductCardList from '../components/ProductCardList';
import Filter from '../components/filter';
import { useSearchParams } from 'next/navigation';

interface Item {
    id: number;
    model: string;
    category: string;
    modelImage?: string;
    brand: string;
    price: number;
    condition: string;
    rating?: number;
}

const ListPage: React.FC = () => {
    const searchParams = useSearchParams();
    const brandFromQuery = searchParams.get('brand'); // Get the brand from the URL query
    const [filteredItems, setFilteredItems] = useState<Item[]>(data.allcars);

    useEffect(() => {
        // Filter items by brand if a brand is specified in the query
        if (brandFromQuery) {
            const filteredByBrand = data.allcars.filter(item => item.brand === brandFromQuery);
            setFilteredItems(filteredByBrand);
        } else {
            setFilteredItems(data.allcars); // Show all items if no brand is specified
        }
    }, [brandFromQuery]);

    return (
        <div className="flex mt-32">
            <Filter items={data.allcars} setFilteredItems={setFilteredItems} defaultBrand={brandFromQuery || ''} />
            <main className="w-full md:w-3/4 p-4">
                <h1 className="text-2xl font-bold text-center mb-6">Electric Cars Gallery</h1>
                <div className="space-y-6">
                    {filteredItems.length === 0 ? (
                        <p className="text-center text-gray-600">No products found.</p>
                    ) : (
                        <ProductCardList products={filteredItems} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default ListPage;
