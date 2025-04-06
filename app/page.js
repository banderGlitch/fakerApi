'use client'
import React from "react";
import ProductList from "./components/ProductList";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // cache valid for 5 min
      cacheTime: 1000 * 60 * 60 * 24, // keep in cache 24 hours
    }
  }
})



export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <ProductList />
        <Footer />
      </QueryClientProvider>
    </>
  );
}