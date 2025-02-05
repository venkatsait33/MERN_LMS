import { useGetCourseDetailsWithPurchaseStatusQuery } from "@/redux/rtkApi/purchaseApi"
import { useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"

export const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated } = useSelector(store => store.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children
}

export const AuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = useSelector(store => store.auth)

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return children
}

export const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector(store => store.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    if (user.role !== "instructor") {
        return <Navigate to="/" />
    }

    return children
}

export const PurchasedCourseProtectedRoute = ({ children }) => {
    const { courseId } = useParams()
    const { data, isLoading } = useGetCourseDetailsWithPurchaseStatusQuery(courseId);
    if (isLoading) return <div>Loading...</div>
    return data?.purchased ? children :
        <Navigate to={`/course-detail/${courseId}`} />
}