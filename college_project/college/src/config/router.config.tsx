import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router";
import { Toaster } from "sonner";
import { NotFound } from "../component/notFound.tsx";

// Public Pages
import Home from "../App";
import CoursePage from "../pages/course";
import AboutPage from "../pages/about";
import ContactPage from "../pages/contact";
import CollegesPage from "../pages/college.tsx";
import AdminCollegePage from "../pages/admin/college.tsx"
import CourseDetailsPage from "../pages/courseDetailPage";
import CollegesByCourseId from "../pages/courseDetail.tsx";
import CollegeDetailsPage from "../pages/collegeDetailPage.tsx";
import AdminLoginPage from "../pages/admin/login.tsx";
import AdminDashboard from "../pages/admin/dashboard.tsx";
import PublicLayout from "../layouts/public.tsx";
import AdminDashboardLayout from "../layouts/dashboard.tsx";
import AdminAddCollegePage from "../pages/admin/addCollege.tsx";
import AdminCoursesPage from "../pages/admin/course.tsx";
import AdminAddCoursePage from "../pages/admin/addCourse.tsx";
import AdminAddFacultyPage from "../pages/admin/addFaculty.tsx";
import AdminFacultiesPage from "../pages/admin/faculty.tsx";
import AdminMessagesPage from "../pages/admin/message.tsx";
import AdminSettingsPage from "../pages/settings.tsx";
import MembersPage from "../pages/admin/member.tsx";
import RegisterUserPage from "../pages/admin/registeredUser.tsx";

const AdminLayout = () => {
  return (
    <div className="admin-layout-wrapper">
      <Outlet />
    </div>
  );
};

// Protected Route Wrapper Component
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <Outlet />;
};

const routerConfig = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/course", element: <CoursePage /> },
      { path: "/colleges", element: <CollegesPage /> },
      { path: "/college/:collegeId", element: <CollegeDetailsPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/course/:courseId", element: <CollegesByCourseId /> },
      { path: "/course/get-detail/:courseId", element: <CourseDetailsPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "login", element: <AdminLoginPage /> },
    ],
  },

  // Protected Dashboard Routes
  {
    path: "/admin/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminDashboardLayout />,
        children: [
          { path: "", element: <AdminDashboard /> },
          { path: "colleges", element: <AdminCollegePage /> },
          { path: "colleges/add", element: <AdminAddCollegePage /> },
          { path: "courses", element: <AdminCoursesPage /> },
          { path: "courses/add", element: <AdminAddCoursePage /> },
          { path: "faculty", element: <AdminFacultiesPage /> },
          { path: "faculties/add", element: <AdminAddFacultyPage /> },
          { path: "messages", element: <AdminMessagesPage /> },
          { path: "members", element: <MembersPage/> },
          { path: "members/register", element: <RegisterUserPage/> },
          { path: "settings", element: <AdminSettingsPage /> },
        ],
      },
    ],
  },

  // 404 NOT FOUND ROUTE
  {
    path: "*",
    element: <NotFound />,
  },
]);

const RouterConfig = () => {
  return (
    <>
      <Toaster richColors closeButton />
      <RouterProvider router={routerConfig} />
    </>
  );
};

export default RouterConfig;