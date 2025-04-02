// 'use client'

'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';


const BASEURL = 'https://dummyjson.com/products'


export default function WishListSummary({saved, setShowWishlist }) {

    const [productMap, setProductMap] = useState({})  // Maintaining the object


    useEffect(() => {
        const fetchMissingProducts = async () => {
            const missingIds = saved.filter((id) => !productMap[id])
            if (missingIds.length === 0) return; // Nothing to fetch

            try {
                const responses = await Promise.all(
                    missingIds.map((id) => axios.get(`${BASEURL}/${id}`))
                );
                const newProducts = responses.reduce((acc, res) => {
                    acc[res.data.id] = res.data
                    return acc
                },{})
                // Merge new data into existing map
                setProductMap((prev) => ({...prev, ...newProducts}))
            } catch(err) {
                console.error('Error fetching wishlist products', err)
            }
        }
        
        if (saved.length > 0){
            fetchMissingProducts()
        }    

    }, [saved])

    // Extra function 

    const savedProducts = saved.map((id) => productMap[id]).filter(Boolean);  // // remove undefined


    // when clicked outside the wishlist

    useEffect(() => {

        const handleClickOutSide = (e) => {
            if (!e.target.closest('.wishlist-dropdown')) {
                setShowWishlist(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutSide);
        return () => document.removeEventListener('mousedown', handleClickOutSide)
    }, [])


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
