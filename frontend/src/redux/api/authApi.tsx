import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/auth` ,credentials: "include"
    }),
    endpoints:(builder) => ({
        checkAuth: builder.query({
            query: () => "/check"
        }),
        signup : builder.mutation({
            query: (data) => ({
                url: "/signup",
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            })
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/update-profile",
                method: "PUT",
                body: data
            })
        })
    })
})


export const {useCheckAuthQuery, useSignupMutation , useLogoutMutation, useLoginMutation} = authApi