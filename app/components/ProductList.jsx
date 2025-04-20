"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useProducts } from "../hooks/useProduct";
import { useInView } from "react-intersection-observer";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";
import { LoaderType_1 } from "./loader";
import _ from "lodash";
import { useSavedProducts } from "../hooks/SavedProductsContext.js";
import QuickViewModal from "./QuickViewModal";
import { useCart } from '../hooks/CartProvider';


export default function ProductList() {
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState("infinite");
    const [allProducts, setAllProducts] = useState([]);
    const { addToCart, } = useCart();
    const { ref, inView } = useInView({ threshold: 1 });

    const { saved, toggleSaved, isSaved } = useSavedProducts();
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const { data, isLoading, isError, isFetching } = useProducts(page);


    useEffect(() => {
        if (mode == "infinite" && data?.products) {
            setAllProducts((prev) => [...prev, ...data?.products]); // basically we managing the state here
        }
    }, [data, mode]);

    useEffect(() => {
        if (mode === "infinite" && inView && !isFetching) {
            setPage((prev) => prev + 1);
        }
    }, [inView, isFetching, mode]);



    return (
        <>
            <div style={{ marginTop: "70px" }}>
                <div className="row">
                    {isLoading && allProducts.length === 0
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <div className="col-md-3 mb-4" key={i}>
                                <ProductSkeleton />
                            </div>
                        ))
                        : allProducts.map((product, index) => (
                            <div className="col-md-3 mb-4" key={index}>
                                <ProductCard addToCart={addToCart} saved={saved} toggleSaved={toggleSaved} isSaved={isSaved} product={product} {...product} setQuickViewProduct={setQuickViewProduct} />
                            </div>
                        ))}
                </div>
                {isFetching && !isLoading && (
                    <LoaderType_1 />
                )}
                {mode === "infinite" && <div ref={ref} style={{ height: 1 }} />}
            </div>
            <QuickViewModal
                addToCart={addToCart}
                show={!!quickViewProduct}
                onHide={() => setQuickViewProduct(null)}
                product={quickViewProduct}
            />
        </>
    );
}
