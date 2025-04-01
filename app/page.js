'use client'
import React  from "react";
import ProductList from "./components/ProductList";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // cache valid for 5 min
      cacheTime: 1000 * 60 * 60 * 24, // keep in cache 24 hours
    }
  }
})

const persister = createSyncStoragePersister({
   storage : window.localStorage
})

persistQueryClient({
  queryClient,
  persister,
  buster: 'v1'
})



export default function Home() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
        <ProductList/>
    </QueryClientProvider>
    </>
  );
}