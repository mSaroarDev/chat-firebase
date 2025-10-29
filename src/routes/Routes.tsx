import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import LazyWrapper from "./LazyWrapper";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoutes";

// routes
const LandingPageMain = lazy(() => import("../views/Homepage/LandingPageMain"));
const HomeMain = lazy(() => import("../views/Homepage/HomeMain"));
const RegisterMain = lazy(() => import("../views/register/RegisterMain"));
const MainChatLayout = lazy(() => import("../views/chats/MainChatLayout"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: LazyWrapper(PublicRoute),
    // errorElement: <h1>404 Not Found</h1>,
    children: [
      { path: "/", element: LazyWrapper(LandingPageMain) },
      { path: "/login", element: LazyWrapper(HomeMain) },
      { path: "/register", element: LazyWrapper(RegisterMain) }
    ]
  },
  {
    path: "dashboard",
    element: LazyWrapper(PrivateRoute),
    // errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        path: "",
        element: LazyWrapper(DashboardLayout),
        // errorElement: <h1>404 Not Found</h1>,
        children: [
          { path: "chats", element: LazyWrapper(MainChatLayout) },
          { path: "messages", element: LazyWrapper(LandingPageMain) },
        ]
      }
    ]
  }
]);