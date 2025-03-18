import { Link, Outlet, useLocation } from "react-router-dom";
import { ApplicationHeader } from "./header/ApplicationHeader";
import { BookMarkedIcon, ScanSearchIcon } from "lucide-react";

export function ApplicationLayout() {
  const location = useLocation();
  const currentPath = location.pathname.slice(1);
  const pathSegments = currentPath.split("/").filter((segment) => segment);
  const isSubPage = pathSegments.length > 1;

  const segmentInfo = {
    discover: {
      title: "Discover",
      icon: <ScanSearchIcon className="h-4 w-4 mr-2" />,
    },
    library: {
      title: "Library",
      icon: <BookMarkedIcon className="h-4 w-4 mr-2" />,
    },
    paper: {
      title: "Paper Details",
      icon: null,
    },
  };

  const generateBreadcrumbs = () => {
    let accumulatedPath = "";

    return (
      pathSegments
        .filter((segment) => {
          const isParameter =
            segment.length > 20 || segment.match(/^[0-9a-f-]{7,}$/i);
          return !isParameter;
        })
        .map((segment, index, filteredSegments) => {
          accumulatedPath += `/${segment}`;

          const info = segmentInfo[segment as keyof typeof segmentInfo];

          return {
            path: accumulatedPath,
            title: info.title,
            icon: info.icon,
            isLast: index === filteredSegments.length - 1,
          };
        })
    );
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="flex flex-col h-screen">
      <ApplicationHeader />
      {isSubPage && (
        <div className="px-6 py-3 border-zinc-100 flex items-center">
          <div className="flex items-center">
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.path} className="flex items-center">
                {index !== 0 && <span className="mx-4 text-zinc-400">/</span>}
                {breadcrumb.isLast ? (
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
