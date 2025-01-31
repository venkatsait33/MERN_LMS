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
          <MyLearning />

      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: "login",
        element: <SignUp />
      },
      {
        path: 'admin',
        element: <Sidebar />,
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