// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { userApi } from "./api/userApi";
import { businessProfileApi } from "./api/businessProfileApi";
import { jobManagementApi } from "./api/jobManagementApi";
import { contentManagementApi } from "./api/contentManagementApi";
import { analycisApi } from "./api/analycisApi";
import { dashboardApi } from "./api/dashboardApi";
import { notificationApi } from "./api/notificationApi";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [businessProfileApi.reducerPath]: businessProfileApi.reducer,
        [jobManagementApi.reducerPath]: jobManagementApi.reducer,
        [contentManagementApi.reducerPath]: contentManagementApi.reducer,
        [analycisApi.reducerPath]: analycisApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, categoryApi.middleware, userApi.middleware, businessProfileApi.middleware, jobManagementApi.middleware, contentManagementApi.middleware, analycisApi.middleware, dashboardApi.middleware, notificationApi.middleware),
});

setupListeners(store.dispatch);
