import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search,
  HelpCircle,
  Bell,
  ChevronDown,
  Check,
  Plus,
  GitBranch,
  Link2,
} from "lucide-react";
import { useAuth } from "../AuthContext";

/* ─── shared data ─────────────────────────────────────────────────────────── */

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

const userMenuItems = ["Account preferences", "Feature previews", "Changelog"];
const themes = ["Dark", "Light", "Classic Dark", "System"];

/* ─── prop types ──────────────────────────────────────────────────────────── */

type TopNavVariant =
  | { variant: "plain"; title: string }
  | { variant: "org"; orgId: string; orgName: string }
  | { variant: "branch"; orgId: string; orgName: string; branchId: string; branchName: string; env: string };

/* ─── sub-components ──────────────────────────────────────────────────────── */

function OrgIcon() {
  return (
    <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center bg-[#2a2a2a]">
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
        <circle cx="8" cy="5" r="2.5" stroke="#3ecf8e" strokeWidth="1.2" />
        <path d="M2 13c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#3ecf8e" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function PlanBadge({ label = "FREE" }: { label?: string }) {
  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold tracking-[0.05em] bg-[#262626] text-neutral-400 border border-[#383838]">
      {label}
    </span>
  );
}

function Slash() {
  return <span className="text-[#3a3a3a]">/</span>;
}

/* ─── Org dropdown ────────────────────────────────────────────────────────── */

function OrgDropdown({ orgId, orgName, onClose }: { orgId: string; orgName: string; onClose: () => void }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = orgs.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute left-0 top-full mt-1 w-60 rounded-lg z-50 py-2 bg-surface border border-app-border shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <div className="px-2 pb-2">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-neutral-800">
            <Search size={12} className="text-[#555]" />
            <input
              placeholder="Find organization..."
              className="bg-transparent text-sm outline-none flex-1 text-neutral-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {filtered.map((org) => (
          <button
            key={org.id}
            onClick={() => { onClose(); navigate(`/dashboard/org/${org.id}`); }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-300 hover:bg-white/5 transition-colors"
          >
            <span>{org.name}</span>
            {org.id === orgId && <Check size={12} className="text-brand" />}
          </button>
        ))}

        <div className="mt-1 pt-1 border-t border-app-border">
          <button
            onClick={() => { onClose(); navigate("/dashboard/organizations"); }}
            className="w-full text-left px-3 py-2 text-sm text-neutral-400 hover:bg-white/5 transition-colors"
          >
            All Organizations
          </button>
          <button
            onClick={() => { onClose(); navigate("/dashboard/new"); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:bg-white/5 transition-colors"
          >
            <Plus size={12} />
            New organization
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── Branch dropdown ─────────────────────────────────────────────────────── */

function BranchDropdown({ orgId, branchId, onClose }: { orgId: string; branchId: string; onClose: () => void }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = mockBranches.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute left-0 top-full mt-1 w-60 rounded-lg z-50 py-2 bg-surface border border-app-border shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <div className="px-2 pb-2">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-neutral-800">
            <Search size={12} className="text-[#555]" />
            <input
              placeholder="Find branch..."
              className="bg-transparent text-sm outline-none flex-1 text-neutral-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {filtered.map((branch) => (
          <button
            key={branch.id}
            onClick={() => { onClose(); navigate(`/dashboard/org/${orgId}/branch/${branch.id}`); }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-300 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <GitBranch size={12} className="text-[#555]" />
              <span>{branch.name}</span>
              <span
                className={`text-[9px] px-1 rounded font-bold tracking-[0.05em] ${
                  branch.status === "PAUSED"
                    ? "text-[#a37c52] bg-[#2a2520]"
                    : "text-brand bg-[#1a2e1a]"
                }`}
              >
                {branch.status}
              </span>
            </div>
            {branch.id === branchId && <Check size={12} className="text-brand" />}
          </button>
        ))}

        <div className="mt-1 pt-1 border-t border-app-border">
          <button
            onClick={() => { onClose(); navigate(`/dashboard/org/${orgId}`); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:bg-white/5 transition-colors"
          >
            <Plus size={12} />
            New branch
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── User menu ───────────────────────────────────────────────────────────── */

function UserMenu() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("Classic Dark");

  async function handleLogout() {
    setOpen(false);
    await signOut();
    navigate("/dashboard/sign-in");
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-brand/[13%] border border-brand/27 text-brand"
      >
        V
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 w-56 rounded-lg z-50 py-2 bg-surface border border-app-border shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="px-3 py-2 mb-1 border-b border-app-border">
              <span className="text-sm text-neutral-300">{user?.email ?? "user@srm.com"}</span>
            </div>

            {userMenuItems.map((item) => (
              <button key={item} className="w-full text-left px-3 py-2 text-sm text-neutral-400 hover:bg-white/5 transition-colors">
                {item}
              </button>
            ))}

            <div className="px-3 pt-2 pb-1 mt-1 border-t border-app-border">
              <p className="text-xs mb-2 text-[#555]">Theme</p>
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setActiveTheme(theme)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded text-neutral-400 hover:bg-white/5 transition-colors"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: activeTheme === theme ? "#3ecf8e" : "transparent",
                      border: activeTheme === theme ? "none" : "1px solid #444",
                    }}
                  />
                  {theme}
                </button>
              ))}
            </div>

            <div className="mt-1 pt-1 border-t border-app-border">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-neutral-400 hover:bg-white/5 transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Right-side actions (shared across all variants) ─────────────────────── */

function NavRight() {
  return (
    <div className="flex items-center gap-1.5">
      <button className="text-sm px-3 py-1.5 rounded text-neutral-400 hover:bg-white/5 transition-colors">
        Feedback
      </button>

      <button className="flex items-center gap-2 px-3 py-1.5 rounded text-sm border border-app-border bg-surface-dark text-neutral-500 min-w-[140px]">
        <Search size={12} />
        <span>Search...</span>
        <span className="text-xs ml-auto text-[#555]">⌘K</span>
      </button>

      <button className="w-8 h-8 rounded-full flex items-center justify-center border border-app-border text-neutral-500 hover:bg-white/5 transition-colors">
        <HelpCircle size={14} />
      </button>

      <button className="w-8 h-8 rounded-full flex items-center justify-center border border-app-border text-neutral-500 hover:bg-white/5 transition-colors">
        <Bell size={14} />
      </button>

      <UserMenu />
    </div>
  );
}

/* ─── Main TopNav export ──────────────────────────────────────────────────── */

export function TopNav(props: TopNavVariant) {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 h-12 flex-shrink-0 relative z-50 bg-neutral-900 border-b border-app-border">
      {/* ── Left breadcrumb ─────────────────────────────── */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Logo */}
        <Link to="/dashboard/organizations" className="flex-shrink-0">
          <svg
            width="18"
            height="18"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer 8-pointed star shape */}
            <path
              d="M 50,5
                  L 58.42,29.67
                  L 81.82,18.18
                  L 70.33,41.58
                  L 95,50
                  L 70.33,58.42
                  L 81.82,81.82
                  L 58.42,70.33
                  L 50,95
                  L 41.58,70.33
                  L 18.18,81.82
                  L 29.67,58.42
                  L 5,50
                  L 29.67,41.58
                  L 18.18,18.18
                  L 41.58,29.67
                  Z"
              stroke="#4ade80"
              strokeWidth="5.5"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Inner circle ring */}
            <circle
              cx="50"
              cy="50"
              r="16"
              stroke="#4ade80"
              strokeWidth="5.5"
              fill="none"
            />
          </svg>
        </Link>

        {/* ── plain: just a page title ── */}
        {props.variant === "plain" && (
          <>
            <Slash />
            <span className="text-sm text-neutral-300">{props.title}</span>
          </>
        )}

        {/* ── org: org switcher ── */}
        {(props.variant === "org" || props.variant === "branch") && (
          <>
            <Slash />
            <div className="relative flex items-center">
              <button
                onClick={() => { setOrgDropdownOpen(!orgDropdownOpen); setBranchDropdownOpen(false); }}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 transition-colors"
              >
                <OrgIcon />
                <span className="text-sm text-neutral-300">{props.orgName}</span>
                <PlanBadge />
                <ChevronDown size={12} className="text-[#555]" />
              </button>

              {orgDropdownOpen && (
                <OrgDropdown orgId={props.orgId} orgName={props.orgName} onClose={() => setOrgDropdownOpen(false)} />
              )}
            </div>
          </>
        )}

        {/* ── branch: branch + env + connect ── */}
        {props.variant === "branch" && (
          <>
            <Slash />
            <div className="relative flex items-center">
              <button
                onClick={() => { setBranchDropdownOpen(!branchDropdownOpen); setOrgDropdownOpen(false); }}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 transition-colors"
              >
                <GitBranch size={13} className="text-brand" />
                <span className="text-sm text-neutral-300">{props.branchName}</span>
                <ChevronDown size={12} className="text-[#555]" />
              </button>

              {branchDropdownOpen && (
                <BranchDropdown orgId={props.orgId} branchId={props.branchId} onClose={() => setBranchDropdownOpen(false)} />
              )}
            </div>

            {/* Env badge segment */}
            <Slash />
            <div className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/5 transition-colors cursor-default">
              <span className="text-sm text-neutral-500">main</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-bold tracking-[0.06em] ${
                  props.env === "PRODUCTION"
                    ? "text-brand bg-[#1a2e1a] border border-[#1e4d2e]"
                    : "text-[#a37c52] bg-[#2a2520] border border-[#3d2e1a]"
                }`}
              >
                {props.env}
              </span>
              <ChevronDown size={11} className="text-[#555]" />
            </div>

            {/* Connect button */}
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs border border-app-border text-neutral-400 hover:bg-white/5 transition-colors">
              <Link2 size={12} />
              Connect
            </button>
          </>
        )}
      </div>

      {/* ── Right actions ─────────────────────────────────── */}
      <NavRight />
    </header>
  );
}

