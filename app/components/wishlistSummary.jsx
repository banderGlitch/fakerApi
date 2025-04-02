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


    useEffect(() => {
     console.log("savedProducts", savedProducts)
    },[savedProducts])

    return (
        <div className='p-4 bg-light rounded shadow-sm'>
            <h5 className='mb-3'>❤️ Wishlist Summary</h5>
            {saved.length === 0 ? (
                <p className='text-muted'>You haven't saved any products yet</p>
            ): (
                <>
                  <p className='text-muted'>
                    You've saved <strong>{saved.length}</strong> item{saved.length > 1 && 's'}.
                  </p>
                  <ul className='list-group'>
                    {savedProducts.map((product) => (
                        <li className="list-group-item d-flex justify-content-between" key={product.id}>
                            <span>{product.list}</span>
                            <small className='text-muted'>ID: {product.id}</small>
                        </li>
                    ))}
                  </ul>
                </>
            )}
        </div>
    )
}