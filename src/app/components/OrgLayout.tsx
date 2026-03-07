import { useState } from "react";
import { Outlet, Link, useParams, useLocation, useNavigate } from "react-router";
import { TopNav } from "./TopNav";
import {
  GitBranch,
  Users,
  Puzzle,
  BarChart2,
  CreditCard,
  Settings,
  PanelLeft,
} from "lucide-react";

const orgs = [
  { id: "vcuwjtqppzztgjwtvmta", name: "Acme Corp" },
  { id: "oeasvtzqxumzbhtcqtmu", name: "GlobalTrade" },
];

const navItems = [
  { icon: GitBranch, label: "Branches", path: "" },
  { icon: Users, label: "Team", path: "team" },
  { icon: Puzzle, label: "Integrations", path: "integrations" },
  { icon: BarChart2, label: "Usage", path: "usage" },
  { icon: CreditCard, label: "Billing", path: "billing" },
  { icon: Settings, label: "Organization Settings", path: "settings" },
];

export function OrgLayout() {
  const params = useParams();
  const orgId = params.orgId || "vcuwjtqppzztgjwtvmta";
  const location = useLocation();

  const currentOrg = orgs.find((o) => o.id === orgId) || orgs[0];
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const getActivePath = () => {
    const segments = location.pathname.split("/");
    const last = segments[segments.length - 1];
    if (last === orgId) return "";
    return last;
  };

  const activePath = getActivePath();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
      <TopNav variant="org" orgId={orgId} orgName={currentOrg.name} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`flex flex-col flex-shrink-0 transition-all duration-200 bg-neutral-900 border-r border-app-border min-h-[calc(100vh-48px)] ${
            sidebarCollapsed ? "w-12" : "w-[208px]"
          }`}
        >
          {/* Nav items */}
          <nav className="flex-1 p-2 pt-3 space-y-0.5">
            {navItems.map((item) => {
              const isActive = activePath === item.path;
              return (
                <Link
                  key={item.label}
                  to={
                    item.path === ""
                      ? `/dashboard/org/${orgId}`
                      : `/dashboard/org/${orgId}/${item.path}`
                  }
                  className={`flex items-center gap-2.5 px-2 py-2 rounded text-sm transition-colors ${
                    isActive ? "bg-white/10 text-white" : "text-neutral-400 hover:bg-white/5"
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <item.icon size={16} className="flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Collapse button */}
          <div className="p-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center px-2 py-2 rounded text-[#555] hover:bg-white/5 transition-colors"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <PanelLeft size={15} />
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
