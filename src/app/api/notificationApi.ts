
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // <-- should be your backend
        prepareHeaders: (headers) => {
            const token = Cookies.get("admin_token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["notificationApi"],
    endpoints: (builder) => ({
        allNotification: builder.query({
            query: () => ({
                url: `/notification/index`,
                method: "GET"
            }),
            providesTags: ["notificationApi"]
        }),
        singleNotificationRead: builder.mutation({
            query: (id) => ({
                url: `/notification/read/${id}`,
                method: "POST"
            }),
            invalidatesTags: ["notificationApi"]
        }),
        readAllNotification: builder.mutation({
            query: () => ({
                url: `/notification/read-all`,
                method: "POST"
            }),
            invalidatesTags: ["notificationApi"]
        })
    }),
});

export const { useAllNotificationQuery, useSingleNotificationReadMutation, useReadAllNotificationMutation } = notificationApi;
