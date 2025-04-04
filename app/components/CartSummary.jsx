'use client'

import React from 'react'
import { useCard } from '../hooks/useCart'

export default function CartSummary({ onClose }) {

    const { cart, removeFromCart } = useCard();
    return (
        <div className='p-4 bg-white border rounded shadow-sm'>
            <h5 className='mb-3'>🛒 Your Cart</h5>
            {
                cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul className='list-group'>
                        {cart.map((product) => (
                            <li key={product.id}
                                className='list-group-item d-flex justify-content-between align-items-center'
                            >
                                <div>
                                    <strong>{product.title}</strong>
                                    <div className='text-muted small'>${product.price}</div>
                                </div>
                                <button
                                    className='btn btn-sm btn-outline-danger'
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    ❌
                                </button>

                            </li>
                        ))}

                    </ul>
                )
            }
            <div className='text-end mt-3'>
                <button className='btn btn-outline-secondary' onClick={onClose}>
                    close 
                </button>
            </div>
        </div>
    )
}