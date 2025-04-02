'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function WishListSummary({saved , useId}) {
    // const { saved, userId } = useSavedProducts()
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
                console.log("response",response)
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
        <div className='bg-light rounded shadow-sm'>
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
                            {/* <span>{product.list}</span> */}
                            <small className='text-muted'>{product.title.slice(0,20)}</small>
                            <div className='d-flex justify-content-center gap-2'>
                            <small className='text-muted'>ID</small>
                            <small className='text-muted'>{product.id}</small>
                            </div>
                        </li>
                    ))}
                  </ul>
                </>
            )}
        </div>
    )
}