import { useEffect, useState } from "react";
import { getUserId } from "../utils/getUserId";

export function useSavedProducts() {
    const userId = getUserId();  // useId : 121213132313
    const STORAGE_KEY =  `savedProducts_${userId}`  //   'savedProducts_1213123123123 / it is created
    const [saved , setSaved]  = useState([]);

    // load saved items on mount

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            // loads the saved items in local storage
            setSaved(JSON.parse(stored))
        }
    },[STORAGE_KEY])

    // Save to localStorage on change

    // this useEffect does is , it saves an item in the local storage with STORAGE_KEY as a key and saved item 
    // which is in  saved array 
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    }, [saved, STORAGE_KEY])


  // its toggle and untoggle the saved button  
    const toggleSaved = (id) => {
        setSaved((prev) => 
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        )
    }

    const isSaved = (id) => saved.includes(id)  // its the toggle button to check weather the id is saved or not


    return {
        saved,          // Array of saved products IDS
        toggleSaved,    // Toggle function
        isSaved,        // Helper to check if a product is saved
        userId          // For debugging or later sync 
    }
}