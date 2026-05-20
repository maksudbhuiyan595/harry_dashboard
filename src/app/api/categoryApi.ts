
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // <-- should be your backend
        prepareHeaders: (headers) => {
            const token = Cookies.get("admin_token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["category"],
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (payload) => ({
                url: `/create-art`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["category"]
        }),
        allCategory: builder.query({
            query: () => ({
                url: "/get-art",
                method: "GET"
            }),
            providesTags: ["category"]
        }),
        categoryDelete: builder.mutation({
            query: (id) => ({
                url: `/delete-art/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["category"]
        })
    }),
});

export const { useCreateCategoryMutation, useAllCategoryQuery, useCategoryDeleteMutation } = categoryApi;
