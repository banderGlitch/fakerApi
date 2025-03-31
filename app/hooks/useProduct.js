'use client'

import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const baseUrl = 'https://dummyjson.com'

export const useProducts = (page, limit = 20) => {
    console.log("page",page)
    const skip = (page - 1) * limit;
    return useQuery({
        queryKey:['products', page],
        queryFn: async () => {
            const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
            console.log("res----->", res)
            return res.data
        },
        keepPreviousData: true,  //
        staleTime: 1000 * 60 * 5,
    })

}