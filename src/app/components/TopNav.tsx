import {
  Bell,
  Check,
  ChevronDown,
  GitBranch,
  HelpCircle,
  Link2,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

import { useAuth } from "@/app/AuthContext";
import { useOrganizations } from "@/hooks/useOrganizations";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const mockBranches = [
  { id: "branch-01", name: "acme-crm", status: "ACTIVE", env: "PRODUCTION" },
  { id: "branch-02", name: "acme-api", status: "PAUSED", env: "STAGING" },
  { id: "branch-03", name: "supplier-portal", status: "ACTIVE", env: "PRODUCTION" },
  { id: "branch-04", name: "vendor-hub", status: "PAUSED", env: "STAGING" },
];

const userMenuItemKeys = ["accountPreferences", "featurePreviews", "changelog"] as const;
const themeKeys = ["dark", "light", "classicDark", "system"] as const;

/* ─── prop types ──────────────────────────────────────────────────────────── */

type TopNavVariant =
  | { variant: "plain"; title: string }
  | { variant: "org"; orgId: string; orgName: string }
  | { variant: "branch"; orgId: string; orgName: string; branchId: string; branchName: string; env: string };

/* ─── sub-components ──────────────────────────────────────────────────────── */

function OrgIcon() {
  return (
    <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center bg-muted">
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
        <circle cx="8" cy="5" r="2.5" stroke="#3ecf8e" strokeWidth="1.2" />
        <path d="M2 13c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#3ecf8e" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function PlanBadge({ label = "FREE" }: { label?: string }) {
  return (
    <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 font-bold tracking-[0.05em]">
      {label}
    </Badge>
  );
}

function Slash() {
  return <span className="text-border">/</span>;
}

/* ─── Org dropdown ────────────────────────────────────────────────────────── */

function OrgDropdown({ orgId, orgName: _orgName, onClose }: { orgId: string; orgName: string; onClose: () => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data: orgs = [] } = useOrganizations();

  const filtered = orgs.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute left-0 top-full mt-1 w-60 rounded-lg z-50 py-2 bg-card border border-border shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <div className="px-2 pb-2">
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-subtle" />
            <Input
              placeholder={t("nav.findOrganization")}
              className="h-8 pl-8 text-sm"
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
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-secondary-foreground hover:bg-white/5 transition-colors"
          >
            <span>{org.name}</span>
            {org.id === orgId && <Check size={12} className="text-brand" />}
          </button>
        ))}

        <Separator className="my-1" />
        <button
          onClick={() => { onClose(); navigate("/dashboard/organizations"); }}
          className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 transition-colors"
        >
          {t("nav.allOrganizations")}
        </button>
        <button
          onClick={() => { onClose(); navigate("/dashboard/new"); }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 transition-colors"
        >
          <Plus size={12} />
          {t("organizations.newOrganization")}
        </button>
      </div>
    </>
  );
}

/* ─── Branch dropdown ─────────────────────────────────────────────────────── */

function BranchDropdown({ orgId, branchId, onClose }: { orgId: string; branchId: string; onClose: () => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = mockBranches.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute left-0 top-full mt-1 w-60 rounded-lg z-50 py-2 bg-card border border-border shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <div className="px-2 pb-2">
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-subtle" />
            <Input
              placeholder={t("nav.findBranch")}
              className="h-8 pl-8 text-sm"
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
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-secondary-foreground hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <GitBranch size={12} className="text-subtle" />
              <span>{branch.name}</span>
              <Badge variant={branch.status === "PAUSED" ? "paused" : "active"} className="text-[9px] px-1 py-0">
                {branch.status}
              </Badge>
            </div>
            {branch.id === branchId && <Check size={12} className="text-brand" />}
          </button>
        ))}

        <Separator className="my-1" />
        <button
          onClick={() => { onClose(); navigate(`/dashboard/org/${orgId}`); }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 transition-colors"
        >
          <Plus size={12} />
          {t("branches.newBranch")}
        </button>
      </div>
    </>
  );
}

/* ─── User menu ───────────────────────────────────────────────────────────── */

function UserMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<typeof themeKeys[number]>("classicDark");

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
          <div className="absolute right-0 top-10 w-56 rounded-lg z-50 py-2 bg-card border border-border shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="px-3 py-2 mb-1 border-b border-border">
              <span className="text-sm text-secondary-foreground">{user?.email ?? "user@srm.com"}</span>
            </div>

            {userMenuItemKeys.map((key) => (
              <button key={key} className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 transition-colors">
                {t(`nav.userMenu.${key}`)}
              </button>
            ))}

            <div className="px-3 pt-2 pb-1 mt-1 border-t border-border">
              <p className="text-xs mb-2 text-subtle">{t("nav.userMenu.theme")}</p>
              {themeKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTheme(key)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded text-muted-foreground hover:bg-white/5 transition-colors"
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activeTheme === key
                        ? "bg-brand"
                        : "bg-transparent border border-border"
                    }`}
                  />
                  {t(`nav.userMenu.themes.${key}`)}
                </button>
              ))}
            </div>

            <div className="mt-1 pt-1 border-t border-border">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 transition-colors"
              >
                {t("common.logOut")}
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
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-1.5">
      <Button variant="ghost" className="text-sm px-3 py-1.5">
        {t("common.feedback")}
      </Button>

      <Button variant="outline" className="flex items-center gap-2 px-3 py-1.5 text-sm min-w-[140px]">
        <Search size={12} />
        <span>{t("common.search")}</span>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <span className="text-xs ml-auto text-subtle">⌘K</span>
      </Button>

      <Button variant="outline" size="icon" className="rounded-full">
        <HelpCircle size={14} />
      </Button>

      <Button variant="outline" size="icon" className="rounded-full">
        <Bell size={14} />
      </Button>

      <UserMenu />
    </div>
  );
}

/* ─── Main TopNav export ──────────────────────────────────────────────────── */

export function TopNav(props: TopNavVariant) {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between px-4 h-12 flex-shrink-0 relative z-50 bg-neutral-900 border-b border-border">
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
            <span className="text-sm text-secondary-foreground">{props.title}</span>
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
                <span className="text-sm text-secondary-foreground">{props.orgName}</span>
                <PlanBadge />
                <ChevronDown size={12} className="text-subtle" />
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
                <span className="text-sm text-secondary-foreground">{props.branchName}</span>
                <ChevronDown size={12} className="text-subtle" />
              </button>

              {branchDropdownOpen && (
                <BranchDropdown orgId={props.orgId} branchId={props.branchId} onClose={() => setBranchDropdownOpen(false)} />
              )}
            </div>

            {/* Env badge segment */}
            <Slash />
            <div className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/5 transition-colors cursor-default">
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <span className="text-sm text-muted-foreground">main</span>
              <Badge
                variant={props.env === "PRODUCTION" ? "active" : "paused"}
                className="text-[9px] px-1.5 py-0.5 font-bold tracking-[0.06em]"
              >
                {props.env}
              </Badge>
              <ChevronDown size={11} className="text-subtle" />
            </div>

            {/* Connect button */}
            <Button variant="outline" className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs h-auto">
              <Link2 size={12} />
              {t("common.connect")}
            </Button>
          </>
        )}
      </div>

      {/* ── Right actions ─────────────────────────────────── */}
      <NavRight />
    </header>
  );
}

