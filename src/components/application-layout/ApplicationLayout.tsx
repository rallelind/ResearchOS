import { Outlet } from "react-router-dom";
import { ApplicationHeader } from "./header/ApplicationHeader";

export function ApplicationLayout() {
  return (
    <div className="flex flex-col h-screen">
      <ApplicationHeader />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
