import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsApi = createApi({
    reducerPath: "productdApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    endpoints: (buider) => ({
        getAllProducts: buider.query({
            query: () => "products",
        }),
    }),
});

export const { useGetAllProductsQuery} = productsApi