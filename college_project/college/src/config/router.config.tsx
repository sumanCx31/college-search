import { createBrowserRouter, RouterProvider } from "react-router";
// import AuthLayout from "../components/layout/authLayout/authLayout";
// import LoginForm from "../components/auth/loginForm";
// import AdminPage from "../components/layout/adminLayout/adminLayout";
// import Dashboard from "../pages/admin/dashboardPage";


import { Toaster } from "sonner";
import { NotFound } from "../component/notFound.tsx";
import Home from "../App";
import CoursePage from "../pages/course";
import AboutPage from "../pages/about";
import ContactPage from "../pages/contact";
import CollegesPage from "../pages/college.tsx";



const routerConfig = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    
  },
  {
    path:"/course",
    Component:CoursePage
  },
   {
    path:"/colleges",
    Component:CollegesPage
  },
  {
    path:"/about",
    Component:AboutPage
  },
  {
    path:"/contact",
    Component:ContactPage
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

const RouterConfig = () => {
  return (
    <>
      {/* <AuthProvider> */}
        <Toaster richColors closeButton />
        <RouterProvider router={routerConfig} />
      {/* </AuthProvider> */}
    </>
  );
};
export default RouterConfig;
