
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const analycisApi = createApi({
    reducerPath: "analycisApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // <-- should be your backend
        prepareHeaders: (headers) => {
            const token = Cookies.get("admin_token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["analycisApi"],
    endpoints: (builder) => ({
        analycisData: builder.query({
            query: () => ({
                url: `/overview/analytics`,
                method: "GET"
            }),
            providesTags: ["analycisApi"]
        })
    }),
});

export const { useAnalycisDataQuery } = analycisApi;
