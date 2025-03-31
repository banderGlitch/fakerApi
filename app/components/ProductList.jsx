'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useProducts } from '../hooks/useProduct';
import { useInView } from 'react-intersection-observer';
import ProductSkeleton from './ProductSkeleton';
import ProductCard from './ProductCard';
import Loader from './loader';
import axios from 'axios';
import _ from 'lodash'
// implementing debouncing


export default function ProductList() {
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState('infinite')
    const [allProducts, setAllProducts] = useState([]);
    const { ref, inView } = useInView({ threshold: 1 });

    // Search Result
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoadingSearch, setIsLoachingSearch] = useState(false)

    const { data, isLoading, isError, isFetching } = useProducts(page);
    console.log("Data", data)

    // check it has more data
    // const hasMore = data.total ? allProducts.length > data.total : true

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

    // Implement the debouncing here 
    // React won't re-render when that values changes

    const handleSearch = useRef(
        _.debounce(async (value) => {
            console.log("value----->", value)
            if (!value.trim()) {
                setIsSearching(false)
                setSearchResults([])
                return;
            }

            try {
                setIsLoachingSearch(true)
                setSearch(value)
                const res = await axios.get(`https://dummyjson.com/products/search?q=${value}`);
                console.log("res from debouncing-->", res)
                setSearchResults(res.data.products || []);
                setIsSearching(true);
                setIsLoachingSearch(false)
            } catch (err) {
                console.error("Search error", err);
                setIsLoachingSearch(false)
            }

        }, 500)

    ).current

    // prevent event listner to escape to the back of the screen
    useEffect(() => {
        const listner = (e) => {
            if (e.key === 'Escape') {
                setIsSearching(false)
                setSearch('')
                setSearchResults([])
            }
        };
        window.addEventListener('keydown', listner)
        return () => window.removeEventListener('keydown', listner)
    }, []);





    return (
        <>
            <div className='position-fixed top-0 w-100 bg-white z-3 p-3 shadow-sm' style={{ zIndex: 999 }}>
                <div className='d-flex justify-content-center'>
                    <input onChange={(e) => handleSearch(e.target.value)} className='w-50' placeholder='Search here' />
                </div>
                {isLoadingSearch && (
                    <div className='d-flex justify-content-center  text-center mt-10' style={{ zIndex: 1000 }}>
                        <div className='spinner-border text-primary' role='status'></div>
                    </div>
                )}
                {isSearching && (
                    <div className='position-absolute top-20 start-0 w-100 bg-white p-4 border'
                        style={{
                            minHeight: '50vh',
                            zIndex: 998,
                            overflowY: 'auto'
                        }}
                    >
                        {isLoadingSearch ? null : searchResults.length === 0 ? (
                            <p className='text-center mt-5'>No products found for <strong>{search}</strong>.</p>

                        ) : (
                            <>
                                <p className='text-muted'>
                                    Showing {searchResults.length} results for <strong>`{search}`</strong>
                                </p>
                                <div className='row overflow-hidden'>
                                    {searchResults.map((product, i) => (
                                        <div className='col-md-3 mb-4' key={i}>
                                            <ProductCardMini title={product.title} thumbnail={product.thumbnail} />
                                        </div>
                                    ))}

                                </div>
                            </>

                        )}

                    </div>
                )}
            </div>
            <div style={{marginTop:'70px'}}>
                <div className='row'>
                    {(isLoading && allProducts.length === 0)
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <div className='col-md-3 mb-4' key={i}>
                                <ProductSkeleton />
                            </div>
                        ))
                        : allProducts.map((product, index) => (
                            <div className='col-md-3 mb-4' key={index}>
                                <ProductCard {...product} />
                            </div>
                        ))
                    }
                </div>
                {isFetching && !isLoading && (
                    <div className='d-flex justify-content-center my-3'>
                        <div className='spinner-border text-primary' role='status' />
                    </div>
                )}
                {mode === 'infinite' && <div ref={ref} style={{ height: 1 }} />}
            </div>
        </>
    )

}







const ProductCardMini = ({ title, thumbnail }) => {
    return (
        <div className='d-flex flex-column h-40 p-1 border shadow-sm'>
            <img
                src={thumbnail}
                alt={title}
                className='card-img-top'
                style={{ height: '50px', width: '50px', objectFit: 'cover' }}
            />
            <div className='card-body p-2'>
                <h6 className='card-title mb-0' style={{ fontSize: '0.9rem' }}>
                    {title}
                </h6>

            </div>
        </div>
    )
}