import { userLogin } from "@/redux/authSlice"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const USER_API = import.meta.env.VITE_BACKEND_URL

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include'
    }),

    // we use the query for get the data api
    // we use mutation for post the data api

    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data
            })
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(userLogin({ user: result.data.user }))
                } catch (error) {
                    console.log(error);
                }
            }
        })

    })
})

export const { useRegisterUserMutation, useLoginUserMutation } = authApi