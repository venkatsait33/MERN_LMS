import SignUp from './pages/SignUp'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import Course from './pages/admin/course/Course'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetails from './pages/student/CourseDetails'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/searchCourse/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoutes, PurchasedCourseProtectedRoute } from './components/ProtectedRoutes'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <>
          <HeroSection />
          <Courses />
        </>
      },
      {
        path: 'my-learning',
        element:
          <ProtectedRoutes>
            <MyLearning />
          </ProtectedRoutes>

      },
      {
        path: 'profile',
        element:
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
      },
      {
        path: 'course/search',
        element:
          <ProtectedRoutes>
            <SearchPage />
          </ProtectedRoutes>
      },
      {
        path: 'course-details/:courseId',
        element:
          <ProtectedRoutes>
            <CourseDetails />
          </ProtectedRoutes>
      },
      {
        path: '/course-progress/:courseId',
        element:
          <ProtectedRoutes>
            <PurchasedCourseProtectedRoute>
              <CourseProgress />
            </PurchasedCourseProtectedRoute>
          </ProtectedRoutes>

      },
      {
        path: "login",
        element:
          <AuthenticatedUser>
            <SignUp />
          </AuthenticatedUser>
      },
      {
        path: 'admin',
        element:
          <AdminRoute>
            <Sidebar />
          </AdminRoute>,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          }, {
            path: 'course',
            element: <Course />
          }, {
            path: 'course/create',
            element: <AddCourse />
          }, {
            path: 'course/:courseId',
            element: <EditCourse />
          },
          {
            path: 'course/:courseId/lecture',
            element: <CreateLecture />
          },
          {
            path: 'course/:courseId/lecture/:lectureId',
            element: <EditLecture />
          }
        ]
      }
    ],

  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App