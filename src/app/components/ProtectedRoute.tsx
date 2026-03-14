import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/app/AuthContext";

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/dashboard/sign-in" replace />;

  return <Outlet />;
}

export function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to="/dashboard/organizations" replace />;

  return <Outlet />;
}
