import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = import.meta.env.VITE_BACKEND_URL_COURSE

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => (({
                url: '/',
                method: 'POST',
                body: { courseTitle, category }
            }))
        }),
        getCreatorCourses: builder.query({
            query: () => ({
                url: '/',
                method: 'GET'
            })
        }),
        editCourse: builder.mutation({
            query: ({ formData, courseId }) => ({
                url: `/${courseId}`,
                method: 'PUT',
                body: formData
            })
        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: 'GET'
            })
        })

    })
})

export const { useCreateCourseMutation, useGetCreatorCoursesQuery, useEditCourseMutation, useGetCourseByIdQuery } = courseApi