'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();
const CART_KEY = 'user_cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    try {
      const parsed = stored ? JSON.parse(stored) : [];
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCart([]);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    console.log("product--------addToCart------->", product);
    setCart((prev = []) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists ? prev : [...prev, product];
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Check if product is in cart
  const isInCart = (id) => cart.some((p) => p.id === id);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

