'use client'
import React from "react";
import ProductList from "./components/ProductList";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./services/AuthContext";
import LoginForm from "./components/LoginForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // cache valid for 5 min
      cacheTime: 1000 * 60 * 60 * 24, // keep in cache 24 hours
    }
  }
})



function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Header />
          <ProductList />
          <Footer />
          <LoginForm />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default Home