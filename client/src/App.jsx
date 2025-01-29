import SignUp from './pages/SignUp'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'

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
        element: <Profile/>
      },
      {
        path: "login",
        element: <SignUp />
      }
    ]
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