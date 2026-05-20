
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const contentManagementApi = createApi({
    reducerPath: "contentManagementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // <-- should be your backend
        prepareHeaders: (headers) => {
            const token = Cookies.get("admin_token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["contentManagementApi"],
    endpoints: (builder) => ({
        getAllReport: builder.query({
            query: (search) => ({
                url: `/content-moderation/get-report?search=${search}`,
                method: "GET"
            }),
            providesTags: ["contentManagementApi"]
        }),
        singleReport: builder.query({
            query: (id) => ({
                url: `/content-moderation/view-report/${id}`,
                method: "GET"
            }),
            providesTags: ["contentManagementApi"]
        }),
        removeReportContent: builder.mutation({
            query: (id) => ({
                url: `/content-moderation/remove-content/${id}?_method=PUT`,
                method: "POST"
            }),
            invalidatesTags: ["contentManagementApi"]
        }),
        approveReportContent: builder.mutation({
            query: (id) => ({
                url: `/content-moderation/approve/${id}?_method=PUT`,
                method: "POST"
            }),
            invalidatesTags: ["contentManagementApi"]
        })
    }),
});

export const { useGetAllReportQuery, useSingleReportQuery, useRemoveReportContentMutation, useApproveReportContentMutation } = contentManagementApi;
