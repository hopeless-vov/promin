import { createBrowserRouter, redirect } from "react-router";
import { AuthLayout } from "./components/AuthLayout";
import { DashboardLayout } from "./components/DashboardLayout";
import { OrgLayout } from "./components/OrgLayout";
import { BranchLayout } from "./components/BranchLayout";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Organizations } from "./pages/Organizations";
import { NewOrganization } from "./pages/NewOrganization";
import { OrgBranches } from "./pages/OrgBranches";
import { OrgTeam } from "./pages/OrgTeam";
import { OrgIntegrations } from "./pages/OrgIntegrations";
import { OrgUsage } from "./pages/OrgUsage";
import { OrgBilling } from "./pages/OrgBilling";
import { OrgSettings } from "./pages/OrgSettings";
import { BranchOverview } from "./pages/BranchOverview";
import { BranchPlaceholder } from "./pages/BranchPlaceholder";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard/sign-in"),
  },
  {
    path: "/dashboard",
    Component: PublicRoute,
    children: [
      {
        Component: AuthLayout,
        children: [
          {
            index: true,
            loader: () => redirect("/dashboard/sign-in"),
          },
          {
            path: "sign-up",
            Component: SignUp,
          },
          {
            path: "sign-in",
            Component: SignIn,
          },
          {
            path: "forgot-password",
            Component: ForgotPassword,
          },
        ],
      },
    ],
  },
  /* ── Protected routes ── */
  {
    path: "/dashboard",
    Component: ProtectedRoute,
    children: [
      {
        Component: DashboardLayout,
        children: [
          {
            path: "organizations",
            Component: Organizations,
          },
          {
            path: "new",
            Component: NewOrganization,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard/org/:orgId",
    Component: ProtectedRoute,
    children: [
      {
        Component: OrgLayout,
        children: [
          {
            index: true,
            Component: OrgBranches,
          },
          {
            path: "team",
            Component: OrgTeam,
          },
          {
            path: "integrations",
            Component: OrgIntegrations,
          },
          {
            path: "usage",
            Component: OrgUsage,
          },
          {
            path: "billing",
            Component: OrgBilling,
          },
          {
            path: "settings",
            Component: OrgSettings,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard/org/:orgId/branch/:branchId",
    Component: ProtectedRoute,
    children: [
      {
        Component: BranchLayout,
        children: [
          { index: true, Component: BranchOverview },
          { path: "suppliers", Component: BranchPlaceholder },
          { path: "query", Component: BranchPlaceholder },
          { path: "contacts", Component: BranchPlaceholder },
          { path: "access", Component: BranchPlaceholder },
          { path: "documents", Component: BranchPlaceholder },
          { path: "automations", Component: BranchPlaceholder },
          { path: "activity", Component: BranchPlaceholder },
          { path: "insights", Component: BranchPlaceholder },
          { path: "analytics", Component: BranchPlaceholder },
          { path: "logs", Component: BranchPlaceholder },
          { path: "integrations", Component: BranchPlaceholder },
          { path: "settings", Component: BranchPlaceholder },
        ],
      },
    ],
  },
]);