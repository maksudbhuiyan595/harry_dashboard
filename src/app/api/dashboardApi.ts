
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // <-- should be your backend
        prepareHeaders: (headers) => {
            const token = Cookies.get("admin_token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["dashboardApi"],
    endpoints: (builder) => ({
        dashboardOverview: builder.query({
            query: () => ({
                url: `/overview/dashboard`,
                method: "GET"
            }),
            providesTags: ["dashboardApi"]
        })

    }),
});

export const { useDashboardOverviewQuery } = dashboardApi;
