
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const jobManagementApi = createApi({
    reducerPath: "jobManagementApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = Cookies.get("admin_token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["jobManagementApi"],
    endpoints: (builder) => ({
        allJob: builder.query({
            query: ({ category, status, keyword }) => ({
                url: `/job-management/get-job?category=${category}&status=${status}&keyword=${keyword}`,
                method: "GET"
            }),
            providesTags: ["jobManagementApi"]
        }),
        singleJob: builder.query({
            query: (id) => ({
                url: `/job-management/view-job/${id}`,
                method: "GET"
            }),
            providesTags: ["jobManagementApi"]
        }),
        jobApprove: builder.mutation({
            query: (id) => ({
                url: `/job-management/approve/${id}?_method=PUT`,
                method: "POST"
            }),
            invalidatesTags: ["jobManagementApi"]
        }),
        jobReject: builder.mutation({
            query: (id) => ({
                url: `/job-management/reject/${id}?_method=PUT`,
                method: "POST"
            }),
            invalidatesTags: ["jobManagementApi"]
        }),
        jobCancel: builder.mutation({
            query: (id) => ({
                url: `/job-management/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["jobManagementApi"]
        })
    }),
});

export const { useAllJobQuery, useSingleJobQuery, useJobApproveMutation, useJobRejectMutation, useJobCancelMutation } = jobManagementApi;
