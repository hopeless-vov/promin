import { Outlet, Link, useParams, useLocation } from "react-router";
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

const navItems: (
  | { icon: React.ElementType; label: string; path: string }
  | null
)[] = [
  { icon: LayoutDashboard, label: "Branch Overview", path: "" },
  { icon: Table2, label: "Supplier Data", path: "suppliers" },
  { icon: Search, label: "Query Builder", path: "query" },
  null,
  { icon: Database, label: "Contacts", path: "contacts" },
  { icon: ShieldCheck, label: "Access Control", path: "access" },
  { icon: FolderOpen, label: "Documents", path: "documents" },
  { icon: Zap, label: "Automations", path: "automations" },
  { icon: Activity, label: "Activity Feed", path: "activity" },
  null,
  { icon: Lightbulb, label: "Insights", path: "insights" },
  { icon: BarChart2, label: "Analytics", path: "analytics" },
  { icon: ScrollText, label: "Logs", path: "logs" },
  { icon: Puzzle, label: "Integrations", path: "integrations" },
  null,
  { icon: Settings, label: "Branch Settings", path: "settings" },
];

export function BranchLayout() {
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
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#171717", color: "#fff" }}
    >
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
        <aside
          className="flex flex-col flex-shrink-0"
          style={{
            width: "208px",
            backgroundColor: "#171717",
            borderRight: "1px solid #2e2e2e",
            minHeight: "calc(100vh - 48px)",
          }}
        >
          <nav className="flex-1 p-2 pt-3 space-y-0.5">
            {navItems.map((item, index) => {
              if (item === null) {
                return (
                  <div
                    key={`divider-${index}`}
                    className="my-2"
                    style={{ borderTop: "1px solid #222" }}
                  />
                );
              }
              const isActive = activePath === item.path;
              const href =
                item.path === "" ? basePath : `${basePath}/${item.path}`;
              return (
                <Link
                  key={item.label}
                  to={href}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded text-sm transition-colors ${
                    isActive ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                  style={{ color: isActive ? "#fff" : "#737373" }}
                >
                  <item.icon size={15} className="flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto" style={{ backgroundColor: "#171717" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
