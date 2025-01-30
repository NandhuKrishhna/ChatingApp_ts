import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    credentials: "include",
  }),
  tagTypes: ["AuthUser"], 
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => "/check",
      providesTags: ["AuthUser"], 
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AuthUser"], 
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["AuthUser"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AuthUser"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AuthUser"], 
    }),
  }),
});

export const {
  useCheckAuthQuery,
  useSignupMutation,
  useLogoutMutation,
  useLoginMutation,
  useUpdateProfileMutation,
} = authApi;