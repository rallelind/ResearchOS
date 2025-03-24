import { Link, Outlet, useLocation } from "react-router-dom";
import { ApplicationHeader } from "./header/ApplicationHeader";
import { FocusIcon, ScanSearchIcon } from "lucide-react";

// Define types for our breadcrumb structure
type Breadcrumb = {
  path: string;
  title: string;
  icon: React.ReactNode;
};

type BreadcrumbConfig = {
  [path: string]: Breadcrumb[];
};

export function ApplicationLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadcrumbConfig: BreadcrumbConfig = {
    "/discover/paper": [
      { path: "/discover", title: "Discover", icon: <ScanSearchIcon className="h-4 w-4 mr-2" /> },
      { path: "/discover/paper", title: "Paper Details", icon: null }
    ],
    "/focus/research-objectives": [
      { path: "/focus", title: "Focused Research", icon: <FocusIcon className="h-4 w-4 mr-2" /> },
      { path: "/focus/research-objectives", title: "Research Objectives", icon: null }
    ],
  };

  let breadcrumbs: Breadcrumb[] = [];
  
  if (breadcrumbConfig[currentPath]) {
    breadcrumbs = breadcrumbConfig[currentPath];
  } else {
    const matchingPaths = Object.keys(breadcrumbConfig)
      .filter(path => currentPath.startsWith(path))
      .sort((a, b) => b.length - a.length);
    
    if (matchingPaths.length > 0) {
      breadcrumbs = breadcrumbConfig[matchingPaths[0]];
    }
  }

  const showBreadcrumbs = breadcrumbs.length > 0;

  return (
    <div className="flex flex-col h-screen">
      <ApplicationHeader />
      {showBreadcrumbs && (
        <div className="px-6 py-3 border-zinc-100 flex items-center">
          <div className="flex items-center">
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.path} className="flex items-center">
                {index !== 0 && <span className="mx-4 text-zinc-400">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="flex items-center text-sm font-medium text-zinc-800">
                    {breadcrumb.icon}
                    {breadcrumb.title}
                  </span>
                ) : (
                  <Link
                    to={breadcrumb.path}
                    className="flex items-center text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
                  >
                    {breadcrumb.icon}
                    {breadcrumb.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
