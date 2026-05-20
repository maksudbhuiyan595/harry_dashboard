
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const businessProfileApi = createApi({
    reducerPath: "businessProfileApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // <-- should be your backend
        prepareHeaders: (headers) => {
            const token = Cookies.get("admin_token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["business"],
    endpoints: (builder) => ({
        allBusinessUser: builder.query({
            query: ({ categoryValue, bandValue, search }) => ({
                url: `/business-profile/get-user?category=${categoryValue}&is_banned=${bandValue}&keyword=${search}`,
                method: "GET"
            }),
            providesTags: ["business"]
        }),
        singleBusinessUser: builder.query({
            query: (id) => ({
                url: `/business-profile/view-user/${id}`,
                method: "GET"
            }),
            providesTags: ["business"]
        }),

        postPermission: builder.mutation({
            query: (id) => ({
                url: `/business-profile/post-permission/${id}?_method=PUT`,
                method: "POST"
            }),
            invalidatesTags: ["business"]
        }),
        businessProfileDelete: builder.mutation({
            query: (id) => ({
                url: `/user-management/delete-user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["business"]
        }),
        banUser: builder.mutation({
            query: (id) => ({
                url: `/user-management/ban-user/${id}?_method=PUT`,
                method: "POST"
            }),
            invalidatesTags: ["business"]
        }),

        businessPermision: builder.mutation({
            query: (id) => ({
                url: `/business-profile/business-features/${id}?_method=PUT`,
                method: "POST"
            }),
            invalidatesTags: ["business"]
        })

    }),
});

export const { useAllBusinessUserQuery, useSingleBusinessUserQuery, usePostPermissionMutation, useBusinessProfileDeleteMutation, useBanUserMutation, useBusinessPermisionMutation } = businessProfileApi;
