'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserId } from '../utils/getUserId';

const SavedProductsContext = createContext();

export const SavedProductsProvider = ({ children }) => {
  const userId = getUserId();
  const STORAGE_KEY = `savedProducts_${userId}`;
  const [saved, setSaved] = useState([]);

  // Load from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setSaved(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error('❌ Failed to parse saved products:', err);
      setSaved([]);
    }
  }, [STORAGE_KEY]);

  // Save to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved, STORAGE_KEY]);

  const toggleSaved = (id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const isSaved = (id) => saved.includes(id);

  return (
    <SavedProductsContext.Provider value={{ saved, toggleSaved, isSaved, userId }}>
      {children}
    </SavedProductsContext.Provider>
  );
};

export const useSavedProducts = () => useContext(SavedProductsContext);
