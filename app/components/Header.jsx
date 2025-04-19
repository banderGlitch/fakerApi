"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useEscape } from "../hooks/useEscape";
import _ from "lodash";
import ProductCardMini from "./ProductCardMini";
import { useSavedProducts } from "../hooks/useSavedProduct";
import WishListSummary from "./wishlistSummary";
import { useCard } from '../hooks/useCart';
import CartSummary from "./CartSummary";
import { useProducts } from "../hooks/useProduct";
import { useInView } from "react-intersection-observer";

export default function Header() {
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState("infinite");
    const [allProducts, setAllProducts] = useState([]);
    const { addToCart, cart, removeFromCart } = useCard();
    const { ref, inView } = useInView({ threshold: 1 });

    // Search Result
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoadingSearch, setIsLoachingSearch] = useState(false);
    const { saved, toggleSaved, isSaved } = useSavedProducts();
    const [showWishlist, setShowWishlist] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [cartShow, setShowCart] = useState(false)

    const { data, isLoading, isError, isFetching } = useProducts(page);

    // check it has more data
    // const hasMore = data.total ? allProducts.length > data.total : true

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

    // Implement the debouncing here
    // React won't re-render when that values changes

    const handleSearch = useRef(
        _.debounce(async (value) => {
            if (!value.trim()) {
                setIsSearching(false);
                setSearchResults([]);
                return;
            }

            try {
                setIsLoachingSearch(true);
                setSearch(value);
                const res = await axios.get(
                    `https://dummyjson.com/products/search?q=${value}`
                );
                setSearchResults(res.data.products || []);
                setIsSearching(true);
                setIsLoachingSearch(false);
            } catch (err) {
                setIsLoachingSearch(false);
            }
        }, 500)
    ).current;



    useEscape(() => {
        setIsSearching(false);
        setSearch("");
        setSearchResults([]);
    });


    return (
        <div
            className="position-fixed top-0 w-100 bg-white z-3 p-3 shadow-sm"
            style={{ zIndex: 999 }}
        >
            <div className="d-flex justify-content-center">
                <input
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-50"
                    placeholder="Search here"
                />
                <div className="position-relative">
                    <button className="btn btn-outline-secondary" onClick={() => setShowWishlist((prev) => !prev)}>
                        ❤️ Saved <span className="badge bg-danger">{saved.length}</span>
                    </button>
                    {showWishlist && (
                        <div className="whislist-dropdown position-absolute  bg-white border rounder shadow-sm p-3" style={{
                            minWidth: '300px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            zIndex: 1050
                        }}>
                            <WishListSummary setShowWishlist={setShowWishlist} saved={saved} />
                        </div>
                    )}
                </div>
                <div className="position-relative">
                    <button className="btn btn-outline-primary ms-3 position-relative" onClick={() => setShowCart((prev) => !prev)}>
                        🛒
                        {cart.length > 0 && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ fontSize: '0.7rem' }}
                            >{cart.length}
                            </span>
                        )}
                    </button>
                    {
                        cartShow && (
                            <div className="card-dropdown position-absolute end-0 mt-2 bg-white border-rounded shadow-sm p-3"
                            >
                                <CartSummary removeFromCart={removeFromCart} cartShow={cartShow} setShowCart={setShowCart} cart={cart} onClose={() => setShowCart(false)} />
                            </div>
                        )

                    }
                </div>
            </div>
            {isLoadingSearch && (
                <div
                    className="d-flex justify-content-center  text-center mt-10"
                    style={{ zIndex: 1000 }}
                >
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            )}
            {isSearching && (
                <div
                    className="position-absolute top-20 start-0 w-100 bg-white p-4 border"
                    style={{
                        minHeight: "50vh",
                        zIndex: 998,
                        overflowY: "auto",
                    }}
                >
                    {isLoadingSearch ? null : searchResults.length === 0 ? (
                        <p className="text-center mt-5">
                            No products found for <strong>{search}</strong>.
                        </p>
                    ) : (
                        <>
                            <p className="text-muted">
                                Showing {searchResults.length} results for{" "}
                                <strong>`{search}`</strong>
                            </p>
                            <div className="row overflow-hidden">
                                {searchResults.map((product, i) => (
                                    <div className="col-md-3 mb-4" key={i}>
                                        <ProductCardMini
                                            title={product.title}
                                            thumbnail={product.thumbnail}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
