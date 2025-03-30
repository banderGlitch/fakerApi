'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useProducts } from '../hooks/useProduct';
import { useInView } from 'react-intersection-observer';
import ProductSkeleton from './ProductSkeleton';
import ProductCard from './ProductCard';
import Loader from './loader';
import axios from 'axios';
import _, { values } from 'lodash';
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
            // if (!value.trim()) {
            //     setSearchResults([])
            //     setIsSearching(false);
            //     return
            // }

            try {
                const res = await axios.get(`https://dummyjson.com/products/search?q=${value}`);
                console.log("res from debouncing-->", res)
                setSearchResults(res.data.products || []);
                setIsSearching(true);
            } catch (err) {
                console.error("Search error", err);
            }

        }, 500)

    ).current


    useEffect(() => {
        console.log("searchResult", searchResults)
    },[searchResults])




    return (
        <>
        <div className='d-flex justify-content-center m-3'>
            <input onChange={(e) => handleSearch(e.target.value)} className='w-full' placeholder='Search here'/>
        </div>
            {isLoading ? (
                <div className='row'>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div className='col-md-3 mb-4' key={i}>
                            <ProductSkeleton key={i} />
                        </div>
                    ))}
                    <Loader />
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