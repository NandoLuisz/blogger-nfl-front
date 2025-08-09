import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.tsx'
import Home from './components/Home.tsx'
import AddBlogs from './pages/admin/add-blogs/add-blogs.tsx'
import BlogList from './pages/admin/blog-list/blog-list.tsx'
import UpdateProfile from './pages/admin/update-profile/update-profile.tsx'
import AuthLayout from './pages/auth/auth-layout.tsx'
import SignIn from './pages/auth/sign-in/sign-in.tsx'
import SignUp from './pages/auth/sign-up/sign-up.tsx'
import Post from './components/Post.tsx'
import AdminLayout from './pages/admin/admin-layout.tsx'

import { AdminProvider } from './pages/admin/AdminContext.tsx'
import { NotFound } from './pages/404.tsx'

import './index.css'
import PrivateRoute from './components/PrivateRoute.tsx'

const router  = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post/:id", element: <Post /> }
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn />},
      { path: '/sign-up', element: <SignUp />},
    ]
  },
  {
  path: "/",
  element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
  ),
  children: [
    { path: '/add-blog', element: <AddBlogs /> },
    { path: '/blog-list', element: <BlogList /> },
    { path: '/update-profile', element: <UpdateProfile /> }
  ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  </StrictMode>,
)
