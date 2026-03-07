import { Outlet } from "react-router";

export function DashboardLayout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#171717", color: "#fff" }}
    >
      <Outlet />
    </div>
  );
}
