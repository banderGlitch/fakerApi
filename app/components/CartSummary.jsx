'use client'

import React, { useEffect } from 'react'

export default function CartSummary({ onClose, cart, setShowCart, cartShow, removeFromCart }) {


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.cart-drawer') && cartShow) {
                setShowCart(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside)

    }, [setShowCart])


    return (
        <div className={`cart-drawer ${cartShow ? 'open' : ''}`}>
            <div className='p-4 d-flex justify-content-between align-items-center border-bottom'>
                <div className='d-flex flex-column align-items-center '>
                    <h5 className='mb-3'>🛒 Your Cart</h5>
                    <p>{cart.length}</p>
                </div>
                <button className='btn btn-sm btn-outline-danger' onClick={onClose}>
                    ❌ Close
                </button>
            </div>
            <div className='p-3'>
                {
                    cart?.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <ul className='list-group'>
                            {cart?.map((product) => (
                                <li key={product?.id}
                                    className='list-group-item d-flex justify-content-between align-items-center'
                                >
                                    <div>
                                        <strong>{product?.title}</strong>
                                        <div className='text-muted small'>${product?.price}</div>
                                    </div>
                                    <button
                                        className='btn btn-sm btn-outline-danger'
                                        onClick={() => removeFromCart(product?.id)}
                                    >
                                        ❌
                                    </button>

                                </li>
                            ))}

                        </ul>
                    )
                }


            </div>
        </div>
    )
}







