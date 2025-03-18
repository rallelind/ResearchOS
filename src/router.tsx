import { createBrowserRouter } from "react-router-dom";
import { AuthCallback } from "./pages/AuthCallback";
import { ApplicationLayout } from "./components/application-layout/ApplicationLayout";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ApplicationLayout />,
      children: [
        {
          index: true,
          element: <div></div>,
        },
      ],
    },
    {
      path: "/library",
      element: <ApplicationLayout />,
      children: [
        {
          index: true,
          element: <div>Library</div>,
        },
      ],
    },
    {
      // This is the route defined in your application's redirect URL
      path: "/auth/callback",
      element: <AuthCallback />,
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
