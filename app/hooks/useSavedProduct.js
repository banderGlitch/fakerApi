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

// Problem
// You 're calling useSavedProducts is multiple components
// Each cells has its own isolated state (useState([])
// So toggleSaved() in one component doesn't affect the other
// And it may reset or overwrite the array
// import { useEffect, useState } from "react";
// import { getUserId } from "../utils/getUserId";

// export function useSavedProducts() {
//     const userId = getUserId();  // useId : 121213132313
//     const STORAGE_KEY = `savedProducts_${userId}`  //   'savedProducts_1213123123123 / it is created
//     const [saved, setSaved] = useState([]);

//     // load saved items on mount

//     useEffect(() => {
//         const stored = localStorage.getItem(STORAGE_KEY)
//         try {
//             console.log("this is called")
//             const parsed = stored ? JSON.parse(stored) : []
//             if (Array.isArray(parsed)) {
//                 setSaved(parsed)
//                 console.log("this is saved",s)
//             } else {
//                 console.log("this is called!!")
//                 setSaved([]) // fallback if JSON is corrupted
//             }
//         } catch (err) {
//             console.log("Failed to parse saved products", err)
//             setSaved([])
//         }
//     }, [STORAGE_KEY])

//     // Save to localStorage on change

//     // this useEffect does is , it saves an item in the local storage with STORAGE_KEY as a key and saved item
//     // which is in  saved array
//     useEffect(() => {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
//     }, [saved, STORAGE_KEY])


//     // its toggle and untoggle the saved button
//     const toggleSaved = (id) => {
//         setSaved((prevSaved) => {
//             console.log("preSaved",prevSaved)
//             const updated = prevSaved && prevSaved.includes(id) ? prevSaved.filter((pid) => pid !== id) : [...(prevSaved || []), id];
//             console.log("this is toggle",updated)
//             localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
//             return updated;
//         });
//     };


//     useEffect(() => {
//         console.log("saved", saved)
//     }, [saved])

//     const isSaved = (id) => saved?.includes(id)  // its the toggle button to check weather the id is saved or not


//     return {
//         saved,          // Array of saved products IDS
//         toggleSaved,    // Toggle function
//         isSaved,        // Helper to check if a product is saved
//         userId          // For debugging or later sync
//     }
// }