'use client'
import React  from "react";
import ProductList from "./components/ProductList";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'


const queryClient = new QueryClient()



export default function Home() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
        <ProductList/>
    </QueryClientProvider>
    </>
  );
}