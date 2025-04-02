'use client'

import React, { useEffect, useState } from 'react';
import { useSavedProducts } from '../hooks/useSavedProduct';
import axios from 'axios';


export default function WishListSummary() {
    const { saved, userId } = useSavedProducts()
    const [savedProducts, setSavedProducts] = useState([])

    const BASEURL = 'https://dummyjson.com/products'

    useEffect(() => {
        const fetchSavedItems = async () => {
            try {
                // DummyJSON dosen't support fetching multiple IDs at once 
                // so we'll do it in parallel for now 
                const response = await Promise.all(
                    saved.map((id) => axios.get(`${BASEURL}/${id}`))
                )
                const products = response.map((res) => res.data)
                setSavedProducts(products)

            } catch (err) {
                console.error('Error fetching saved product details:', err);
            }
        }
        if (saved.length > 0) {
            fetchSavedItems()
        } else {
            setSavedProducts([])
        }

    }, [saved])

    return (
        <div>
            <p>this is paragraph </p>
        </div>
    )
}