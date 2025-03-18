import { createBrowserRouter } from "react-router-dom";
import { AuthCallback } from "./pages/AuthCallback";
import { ApplicationLayout } from "./components/application-layout/ApplicationLayout";
import { DiscoverPapersPage } from "./pages/DiscoverPapers";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ApplicationLayout />,
      children: [
        {
          index: true,
          element: <DiscoverPapersPage />,
        },
        {
          path: "library",
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
