'use client'; // ប្រើ 'use client' ដើម្បីបង្កើត client component
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';

const Cart: React.FC = () => {
  // ទាញយក cartItems ពី Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
