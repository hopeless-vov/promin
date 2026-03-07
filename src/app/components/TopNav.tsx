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

const userMenuItems = [
  "Account preferences",
  "Feature previews",
  "Changelog",
];

const themes = ["Dark", "Light", "Classic Dark", "System"];

/* ─── prop types ──────────────────────────────────────────────────────────── */

type TopNavVariant =
  | { variant: "plain"; title: string }
  | { variant: "org"; orgId: string; orgName: string }
  | { variant: "branch"; orgId: string; orgName: string; branchId: string; branchName: string; env: string };

/* ─── sub-components ──────────────────────────────────────────────────────── */

/** Small org icon used in breadcrumbs */
function OrgIcon() {
  return (
    <div
      className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center"
      style={{ backgroundColor: "#2a2a2a" }}
    >
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
        <circle cx="8" cy="5" r="2.5" stroke="#3ecf8e" strokeWidth="1.2" />
        <path
          d="M2 13c0-3.314 2.686-5 6-5s6 1.686 6 5"
          stroke="#3ecf8e"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/** FREE / TEAM badge */
function PlanBadge({ label = "FREE" }: { label?: string }) {
  return (
    <span
      className="text-xs px-1.5 py-0.5 rounded"
      style={{
        backgroundColor: "#262626",
        color: "#a3a3a3",
        border: "1px solid #383838",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </span>
  );
}

/** Separator slash */
function Slash() {
  return <span style={{ color: "#3a3a3a" }}>/</span>;
}

/* ─── Org dropdown ────────────────────────────────────────────────────────── */

function OrgDropdown({
  orgId,
  orgName,
  onClose,
}: {
  orgId: string;
  orgName: string;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = orgs.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="absolute left-0 top-full mt-1 w-60 rounded-lg z-50 py-2"
        style={{
          backgroundColor: "#1e1e1e",
          border: "1px solid #2e2e2e",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        {/* Search */}
        <div className="px-2 pb-2">
          <div
            className="flex items-center gap-2 px-2 py-1.5 rounded"
            style={{ backgroundColor: "#262626" }}
          >
            <Search size={12} style={{ color: "#555" }} />
            <input
              placeholder="Find organization..."
              className="bg-transparent text-sm outline-none flex-1"
              style={{ color: "#d4d4d4" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Org list */}
        {filtered.map((org) => (
          <button
            key={org.id}
            onClick={() => {
              onClose();
              navigate(`/dashboard/org/${org.id}`);
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            style={{ color: "#d4d4d4" }}
          >
            <span>{org.name}</span>
            {org.id === orgId && <Check size={12} style={{ color: "#3ecf8e" }} />}
          </button>
        ))}

        {/* Footer actions */}
        <div style={{ borderTop: "1px solid #2e2e2e" }} className="mt-1 pt-1">
          <button
            onClick={() => { onClose(); navigate("/dashboard/organizations"); }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            style={{ color: "#a3a3a3" }}
          >
            All Organizations
          </button>
          <button
            onClick={() => { onClose(); navigate("/dashboard/new"); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            style={{ color: "#a3a3a3" }}
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

function BranchDropdown({
  orgId,
  branchId,
  onClose,
}: {
  orgId: string;
  branchId: string;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = mockBranches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="absolute left-0 top-full mt-1 w-60 rounded-lg z-50 py-2"
        style={{
          backgroundColor: "#1e1e1e",
          border: "1px solid #2e2e2e",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        {/* Search */}
        <div className="px-2 pb-2">
          <div
            className="flex items-center gap-2 px-2 py-1.5 rounded"
            style={{ backgroundColor: "#262626" }}
          >
            <Search size={12} style={{ color: "#555" }} />
            <input
              placeholder="Find branch..."
              className="bg-transparent text-sm outline-none flex-1"
              style={{ color: "#d4d4d4" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Branch list */}
        {filtered.map((branch) => (
          <button
            key={branch.id}
            onClick={() => {
              onClose();
              navigate(`/dashboard/org/${orgId}/branch/${branch.id}`);
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            style={{ color: "#d4d4d4" }}
          >
            <div className="flex items-center gap-2">
              <GitBranch size={12} style={{ color: "#555" }} />
              <span>{branch.name}</span>
              <span
                className="text-xs px-1 rounded"
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  color: branch.status === "PAUSED" ? "#a37c52" : "#3ecf8e",
                  backgroundColor:
                    branch.status === "PAUSED" ? "#2a2520" : "#1a2e1a",
                }}
              >
                {branch.status}
              </span>
            </div>
            {branch.id === branchId && (
              <Check size={12} style={{ color: "#3ecf8e" }} />
            )}
          </button>
        ))}

        {/* New branch */}
        <div style={{ borderTop: "1px solid #2e2e2e" }} className="mt-1 pt-1">
          <button
            onClick={() => { onClose(); navigate(`/dashboard/org/${orgId}`); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            style={{ color: "#a3a3a3" }}
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
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("Classic Dark");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
        style={{
          backgroundColor: "#3ecf8e22",
          border: "1px solid #3ecf8e44",
          color: "#3ecf8e",
          fontWeight: 700,
        }}
      >
        V
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-10 w-56 rounded-lg z-50 py-2"
            style={{
              backgroundColor: "#1e1e1e",
              border: "1px solid #2e2e2e",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="px-3 py-2 mb-1"
              style={{ borderBottom: "1px solid #2e2e2e" }}
            >
              <span className="text-sm" style={{ color: "#d4d4d4" }}>
                user@srm.com
              </span>
            </div>

            {userMenuItems.map((item) => (
              <button
                key={item}
                className="w-full text-left px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                style={{ color: "#a3a3a3" }}
              >
                {item}
              </button>
            ))}

            <div
              className="px-3 pt-2 pb-1 mt-1"
              style={{ borderTop: "1px solid #2e2e2e" }}
            >
              <p className="text-xs mb-2" style={{ color: "#555" }}>
                Theme
              </p>
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setActiveTheme(theme)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-white/5 transition-colors"
                  style={{ color: "#a3a3a3" }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        activeTheme === theme ? "#3ecf8e" : "transparent",
                      border:
                        activeTheme === theme ? "none" : "1px solid #444",
                    }}
                  />
                  {theme}
                </button>
              ))}
            </div>

            <div
              style={{ borderTop: "1px solid #2e2e2e" }}
              className="mt-1 pt-1"
            >
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/dashboard/sign-in");
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                style={{ color: "#a3a3a3" }}
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
      <button
        className="text-sm px-3 py-1.5 rounded hover:bg-white/5 transition-colors"
        style={{ color: "#a3a3a3" }}
      >
        Feedback
      </button>

      <button
        className="flex items-center gap-2 px-3 py-1.5 rounded text-sm"
        style={{
          color: "#737373",
          border: "1px solid #2e2e2e",
          backgroundColor: "#1a1a1a",
          minWidth: "140px",
        }}
      >
        <Search size={12} />
        <span>Search...</span>
        <span className="text-xs ml-auto" style={{ color: "#555" }}>
          ⌘K
        </span>
      </button>

      <button
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
        style={{ border: "1px solid #2e2e2e", color: "#737373" }}
      >
        <HelpCircle size={14} />
      </button>

      <button
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
        style={{ border: "1px solid #2e2e2e", color: "#737373" }}
      >
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
    <header
      className="flex items-center justify-between px-4 flex-shrink-0 relative z-50"
      style={{
        height: "48px",
        backgroundColor: "#171717",
        borderBottom: "1px solid #2e2e2e",
      }}
    >
      {/* ── Left breadcrumb ─────────────────────────────── */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Logo */}
        <Link to="/dashboard/organizations" className="flex-shrink-0">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
          >
            <path d="M6 24L16 6L26 24H6Z" fill="#3ecf8e" />
            <path d="M6 24L16 14L26 24H6Z" fill="#3ecf8e" opacity="0.5" />
          </svg>
        </Link>

        {/* ── plain: just a page title ── */}
        {props.variant === "plain" && (
          <>
            <Slash />
            <span className="text-sm" style={{ color: "#d4d4d4" }}>
              {props.title}
            </span>
          </>
        )}

        {/* ── org: org switcher ── */}
        {(props.variant === "org" || props.variant === "branch") && (
          <>
            <Slash />
            {/* Org segment */}
            <div className="relative flex items-center">
              <button
                onClick={() => {
                  setOrgDropdownOpen(!orgDropdownOpen);
                  setBranchDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 transition-colors"
              >
                <OrgIcon />
                <span className="text-sm" style={{ color: "#d4d4d4" }}>
                  {props.orgName}
                </span>
                <PlanBadge />
                <ChevronDown size={12} style={{ color: "#555" }} />
              </button>

              {orgDropdownOpen && (
                <OrgDropdown
                  orgId={props.orgId}
                  orgName={props.orgName}
                  onClose={() => setOrgDropdownOpen(false)}
                />
              )}
            </div>
          </>
        )}

        {/* ── branch: branch + env + connect ── */}
        {props.variant === "branch" && (
          <>
            <Slash />
            {/* Branch segment */}
            <div className="relative flex items-center">
              <button
                onClick={() => {
                  setBranchDropdownOpen(!branchDropdownOpen);
                  setOrgDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 transition-colors"
              >
                <GitBranch size={13} style={{ color: "#3ecf8e" }} />
                <span className="text-sm" style={{ color: "#d4d4d4" }}>
                  {props.branchName}
                </span>
                <ChevronDown size={12} style={{ color: "#555" }} />
              </button>

              {branchDropdownOpen && (
                <BranchDropdown
                  orgId={props.orgId}
                  branchId={props.branchId}
                  onClose={() => setBranchDropdownOpen(false)}
                />
              )}
            </div>

            {/* Env badge segment */}
            <Slash />
            <div
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/5 transition-colors cursor-default"
            >
              <span className="text-sm" style={{ color: "#737373" }}>
                main
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: props.env === "PRODUCTION" ? "#3ecf8e" : "#a37c52",
                  backgroundColor:
                    props.env === "PRODUCTION" ? "#1a2e1a" : "#2a2520",
                  border: `1px solid ${props.env === "PRODUCTION" ? "#1e4d2e" : "#3d2e1a"}`,
                }}
              >
                {props.env}
              </span>
              <ChevronDown size={11} style={{ color: "#555" }} />
            </div>

            {/* Connect button */}
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs hover:bg-white/5 transition-colors"
              style={{ border: "1px solid #2e2e2e", color: "#a3a3a3" }}
            >
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
