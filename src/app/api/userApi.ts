
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = Cookies.get("admin_token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        allUser: builder.query({
            query: () => ({
                url: `/user-management/get-user?per_page=10&page`,
                method: "GET"
            }),
            providesTags: ["user"]
        }),
        singleUser: builder.query({
            query: (userId) => ({
                url: `/user-management/view-user/${userId}`
            }),
            providesTags: ["user"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user-management/delete-user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["user"]
        }),
        bandUser: builder.mutation({
            query: (id) => ({
                url: `/user-management/ban-user/${id}?_method=PUT`,
                method: "POST"
            }),
            invalidatesTags: ["user"]
        })
    }),
});

export const { useAllUserQuery, useSingleUserQuery, useDeleteUserMutation, useBandUserMutation } = userApi;
