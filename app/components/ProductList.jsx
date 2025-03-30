'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useProducts } from '../hooks/useProduct';
import { useInView } from 'react-intersection-observer';
import ProductSkeleton from './ProductSkeleton';
import ProductCard from './ProductCard';
import Loader from './loader';

export default function ProductList() {
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState('infinite')
    const [allProducts, setAllProducts] = useState([]);
    const { ref, inView } = useInView({ threshold: 1 });
    const bottomRef = useRef(null);

    const { data, isLoading, isError, isFetching } = useProducts(page);
    console.log("Data", data)


    useEffect(() => {
        if (mode == "infinite" && data?.products) {
            setAllProducts((prev) => [...prev, ...data?.products])  // basically we managing the state here 
        }

    }, [data, mode])


    useEffect(() => {
        if (mode === 'infinite' && inView && !isFetching) {
            setPage((prev) => prev + 1)
        }

    }, [inView, isFetching, mode])



    return (
        <>
            {isLoading ? (
                <div className='row'>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div className='col-md-3 mb-4' key={i}>
                            <ProductSkeleton key={i} />
                        </div>
                    ))}
                  <Loader/>
                </div>
            ) : isError ? (
                <p className="text-danger">Error loading products</p>
            ) : (
                <div className='row'>
                    {allProducts && allProducts?.map((product, index) => (
                        <div className='col-md-3 mb-4' key={index}>
                            <ProductCard  {...product} />
                        </div>
                    ))}
                </div>
            )}
            {mode === 'infinite' && <div ref={ref} style={{ height: 1 }} />}
        </>
    )

}