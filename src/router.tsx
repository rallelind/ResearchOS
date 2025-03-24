import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthCallback } from "./pages/AuthCallback";
import { ApplicationLayout } from "./components/application-layout/ApplicationLayout";
import { DiscoverPapersPage } from "./pages/DiscoverPapers";
import { PaperPage } from "./pages/Paper";
import { FocusedResearch } from "./pages/FocusedResearch";
import { ResearchObjectivePage } from "./pages/ResearchObjectivePage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ApplicationLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/discover" replace />,
        },
        {
          path: "discover",
          element: <DiscoverPapersPage />,
        },
        {
          path: "discover/paper/:paperId",
          element: <PaperPage />,
        },
        {
          path: "library",
          element: <div>Library</div>,
        },
        {
          path: "focus",
          element: <FocusedResearch />,
        },
        {
          path: "focus/research-objectives/:researchObjectiveId",
          element: <ResearchObjectivePage />,
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
