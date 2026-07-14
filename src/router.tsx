import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./layout/main-layout";
import AuthLayout from "./layout/auth-layout";
import Home from "./pages/home/Home";
import Terms from "./pages/terms/Terms";
import Privacy from "./pages/privacy/Privacy";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";

// Admin Dashboard Imports
import { DashboardRoot } from "./dashboard/DashboardRoot";
import { LoginPage as AdminLoginPage } from "./dashboard/pages/LoginPage";
import { ForgotPasswordPage as AdminForgotPasswordPage } from "./dashboard/pages/ForgotPasswordPage";
import { UsersPage } from "./dashboard/pages/UsersPage";
import { ProtectedRoute, PublicOnlyRoute } from "./dashboard/guards/ProtectedRoute";
import { AdminLayout } from "./dashboard/components/layout/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'terms-and-conditions',
        element: <Terms />,
      },
      {
        path: 'privacy-policy',
        element: <Privacy />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardRoot />,
    children: [
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            path: "login",
            element: <AdminLoginPage />,
          },
          {
            path: "forgot-password",
            element: <AdminForgotPasswordPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "users",
                element: <UsersPage />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/dashboard/users" replace />,
      },
      {
        index: true,
        element: <Navigate to="/dashboard/users" replace />,
      },
    ],
  },
]);
