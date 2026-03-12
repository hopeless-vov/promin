import { Outlet, Link, useParams, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { TopNav } from "./TopNav";
import {
  LayoutDashboard,
  Table2,
  Search,
  Database,
  ShieldCheck,
  FolderOpen,
  Zap,
  Activity,
  Lightbulb,
  BarChart2,
  ScrollText,
  Puzzle,
  Settings,
} from "lucide-react";

const orgs = [
  { id: "vcuwjtqppzztgjwtvmta", name: "Acme Corp" },
  { id: "oeasvtzqxumzbhtcqtmu", name: "GlobalTrade" },
];

const mockBranches = [
  { id: "branch-01", name: "acme-crm", status: "ACTIVE", env: "PRODUCTION" },
  { id: "branch-02", name: "acme-api", status: "PAUSED", env: "STAGING" },
  { id: "branch-03", name: "supplier-portal", status: "ACTIVE", env: "PRODUCTION" },
  { id: "branch-04", name: "vendor-hub", status: "PAUSED", env: "STAGING" },
];

const navItems: ({ icon: React.ElementType; labelKey: string; path: string } | null)[] = [
  { icon: LayoutDashboard, labelKey: "nav.sidebar.branchOverview", path: "" },
  { icon: Table2, labelKey: "nav.sidebar.supplierData", path: "suppliers" },
  { icon: Search, labelKey: "nav.sidebar.queryBuilder", path: "query" },
  null,
  { icon: Database, labelKey: "nav.sidebar.contacts", path: "contacts" },
  { icon: ShieldCheck, labelKey: "nav.sidebar.accessControl", path: "access" },
  { icon: FolderOpen, labelKey: "nav.sidebar.documents", path: "documents" },
  { icon: Zap, labelKey: "nav.sidebar.automations", path: "automations" },
  { icon: Activity, labelKey: "nav.sidebar.activityFeed", path: "activity" },
  null,
  { icon: Lightbulb, labelKey: "nav.sidebar.insights", path: "insights" },
  { icon: BarChart2, labelKey: "nav.sidebar.analytics", path: "analytics" },
  { icon: ScrollText, labelKey: "nav.sidebar.logs", path: "logs" },
  { icon: Puzzle, labelKey: "integrations.title", path: "integrations" },
  null,
  { icon: Settings, labelKey: "nav.sidebar.branchSettings", path: "settings" },
];

export function BranchLayout() {
  const { t } = useTranslation();
  const params = useParams();
  const orgId = params.orgId || "vcuwjtqppzztgjwtvmta";
  const branchId = params.branchId || "branch-01";
  const location = useLocation();

  const currentOrg = orgs.find((o) => o.id === orgId) || orgs[0];
  const currentBranch = mockBranches.find((b) => b.id === branchId) || mockBranches[0];

  const basePath = `/dashboard/org/${orgId}/branch/${branchId}`;

  const getActivePath = () => {
    if (location.pathname === basePath || location.pathname === basePath + "/") return "";
    const relative = location.pathname.slice(basePath.length + 1);
    return relative.split("/")[0];
  };

  const activePath = getActivePath();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
      <TopNav
        variant="branch"
        orgId={orgId}
        orgName={currentOrg.name}
        branchId={branchId}
        branchName={currentBranch.name}
        env={currentBranch.env}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex flex-col flex-shrink-0 w-[208px] bg-neutral-900 border-r border-app-border min-h-[calc(100vh-48px)]">
          <nav className="flex-1 p-2 pt-3 space-y-0.5">
            {navItems.map((item, index) => {
              if (item === null) {
                return <div key={`divider-${index}`} className="my-2 border-t border-[#222]" />;
              }
              const isActive = activePath === item.path;
              const href = item.path === "" ? basePath : `${basePath}/${item.path}`;
              return (
                <Link
                  key={item.labelKey}
                  to={href}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded text-sm transition-colors ${
                    isActive ? "bg-white/10 text-white" : "text-neutral-500 hover:bg-white/5"
                  }`}
                >
                  <item.icon size={15} className="flex-shrink-0" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-neutral-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
