import { createBrowserRouter } from "react-router-dom";
import AuthCallback from "./pages/AuthCallback";
import Home from "./pages/Home";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      // This is the route defined in your application's redirect URL
      path: "/auth/callback",
      element: <AuthCallback />,
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
