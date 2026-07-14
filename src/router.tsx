import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/main-layout";
import AuthLayout from "./layout/auth-layout";
import Home from "./pages/home/Home";
import Terms from "./pages/terms/Terms";
import Privacy from "./pages/privacy/Privacy";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";

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
]);
