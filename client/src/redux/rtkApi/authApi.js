import { userLogin, userLogout } from "@/redux/slice/authSlice"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const USER_API = import.meta.env.VITE_BACKEND_URL + "/api/v1/user/"

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
        }),
        logOutUser: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch }) {
                try {
                    dispatch(userLogout());
                } catch (error) {
                    console.log(error);
                }
            }

        }),
        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(userLogin({ user: result.data.user }))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: 'profile/update',
                method: 'PUT',
                body: data,
                credentials: "include"
            })
        })

    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogOutUserMutation, useLoadUserQuery, useUpdateUserMutation } = authApi