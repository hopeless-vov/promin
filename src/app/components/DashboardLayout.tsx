import { Outlet } from "react-router";

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
      <Outlet />
    </div>
  );
}
