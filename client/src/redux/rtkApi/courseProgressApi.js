import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_BASE_URL = "http://localhost:8080/api/v1/progress"

export const courseProgressApi = createApi({
    reducerPath: "courseProgressApi",
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_PROGRESS_BASE_URL,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getCourseProgress: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET"
            })
        }),
        updateLectureProgress: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}/view`,
                method: "POST"
            })
        }),
        markCourseAsCompleted: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/complete`,
                method: "POST"
            })
        }),
        markCourseAsInCompleted: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/incomplete`,
                method: "POST"
            })
        })
    })

})

export const { useGetCourseProgressQuery, useUpdateLectureProgressMutation, useMarkCourseAsCompletedMutation, useMarkCourseAsInCompletedMutation } = courseProgressApi