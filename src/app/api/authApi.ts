import { LoginApiPayloadType, LoginApiResponse, OtpSendApiResponseType, SendOtpApiPayload } from "@/utility/loginType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const authApi = createApi({
    reducerPath: "authApi",
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
        login: builder.mutation<LoginApiResponse, LoginApiPayloadType>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        sendOtp: builder.mutation<OtpSendApiResponseType, SendOtpApiPayload>({
            query: (formData) => ({
                url: `/auth/resend-otp`,
                method: "POST",
                body: formData
            })
        }),
        userProfile: builder.query({
            query: () => ({
                url: `/auth/profile`,
                method: "GET"
            }),
            providesTags: ["user"]
        }),
        profileUpdate: builder.mutation({
            query: (formData) => ({
                url: `/auth/profile-update?_method=PUT`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["user"]
        }),
        passwordUpdate: builder.mutation({
            query: (payload) => ({
                url: `/auth/password-reset?_method=PUT`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["user"]
        })
    }),
});

export const { useLoginMutation, useSendOtpMutation, useUserProfileQuery, useProfileUpdateMutation, usePasswordUpdateMutation } = authApi;
