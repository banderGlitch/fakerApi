'use client'


import { useEffect, useState } from 'react';
import { getUserId } from '../utils/getUserId';

export function useSavedProducts() {
    const userId = getUserId();
    const STORAGE_KEY = `savedProducts_${userId}`;
    const [saved, setSaved] = useState([]);

    // ✅ Load saved items from localStorage on first mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const parsed = stored ? JSON.parse(stored) : [];

            if (Array.isArray(parsed)) {
                setSaved(parsed);
            } else {
                setSaved([]); // fallback if corrupted
            }
        } catch (err) {
            console.error('❌ Failed to parse saved products:', err);
            setSaved([]);
        }
    }, [STORAGE_KEY]);

    // ✅ Save to localStorage whenever `saved` changes
    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }, [saved, STORAGE_KEY]);

    // ✅ Toggle save/unsave
    const toggleSaved = (id) => {
        setSaved((prevSaved) =>
            prevSaved.includes(id)
                ? prevSaved.filter((pid) => pid !== id)
                : [...prevSaved, id]
        );
    };

    // ✅ Helper to check if a product is saved
    const isSaved = (id) => saved?.includes(id);

    // 🔍 Debug log
    useEffect(() => {
        console.log('🔁 Updated saved state:', saved);
    }, [saved]);

    return {
        saved,         // Array of saved product IDs
        toggleSaved,   // Function to add/remove a saved product
        isSaved,       // Check if product is saved
        userId         // Unique anonymous ID
    };
}
