import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = import.meta.env.VITE_BACKEND_URL_COURSE

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Refetch_lecture"],
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
        }),
        createLectures: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `/${courseId}/lecture`,
                method: 'POST',
                body: { lectureTitle }
            })
        }),
        getCourseLectures: builder.query({
            query: (courseId) => ({
                url: `/${courseId}/lecture`,
                method: 'GET'
            }),
            providesTags: ["Refetch_lecture"]

        }),
        editLectures: builder.mutation({
            query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: 'POST',
                body: { lectureTitle, videoInfo, isPreviewFree }
            })
        }),
        removeLecture: builder.mutation({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Refetch_lecture"]
        }),
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: 'GET'
            })
        }),
        publishCourse: builder.mutation({
            query: ({ courseId, query }) => ({
                url: `/${courseId}?publish=${query}`,
                method: 'PATCH'
            })
        }),
        deleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: 'DELETE'
            }),
        })
    })
})

export const { useCreateCourseMutation, useGetCreatorCoursesQuery, useEditCourseMutation, useGetCourseByIdQuery, useCreateLecturesMutation, useGetCourseLecturesQuery, useEditLecturesMutation, useRemoveLectureMutation, useGetLectureByIdQuery, usePublishCourseMutation, useDeleteCourseMutation } = courseApi