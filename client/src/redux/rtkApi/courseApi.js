import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = import.meta.env.VITE_BACKEND_URL + "/api/v1/course"

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
        getPublishedCourses: builder.query({
            query: () => ({
                url: '/published-courses',
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
            query: ({ lectureTitle, videoInfo, isPreviewFree, videoLink,courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: 'POST',
                body: { lectureTitle, videoInfo, isPreviewFree, videoLink }
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
        }),
        getSearchCourses: builder.query({
            query: ({ searchQuery, categories, sortByPrice }) => {
                // Build query string
                let queryString = `/search?query=${encodeURIComponent(searchQuery)}`

                // append categories to query string
                if (categories && categories.length > 0) {
                    const categoriesString = categories.map(encodeURIComponent).join(",");
                    queryString += `&categories=${categoriesString}`;
                }

                // Append sortByPrice is available
                if (sortByPrice) {
                    queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
                }

                return {
                    url: queryString,
                    method: "GET",
                }
            }
        })
    })
})

export const { useCreateCourseMutation,
    useGetCreatorCoursesQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useCreateLecturesMutation,
    useGetCourseLecturesQuery,
    useEditLecturesMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
    useDeleteCourseMutation,
    useGetPublishedCoursesQuery,
    useGetSearchCoursesQuery } = courseApi