import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Search,
  Plus,
  ChevronDown,
  ArrowUpDown,
  LayoutGrid,
  List,
  MoreHorizontal,
  PauseCircle,
  Info,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";

const mockBranches = [
  { id: "branch-01", name: "acme-crm", region: "EU | eu-central-1", status: "ACTIVE" },
  { id: "branch-02", name: "acme-api", region: "EU | eu-central-1", status: "PAUSED" },
  { id: "branch-03", name: "supplier-portal", region: "US | us-east-1", status: "ACTIVE" },
  { id: "branch-04", name: "vendor-hub", region: "US | us-east-1", status: "PAUSED" },
];

function StatusBadge({ status }: { status: string }) {
  const isPaused = status === "PAUSED";
  return (
    <Badge variant={isPaused ? "paused" : "active"} className="text-[10px] tracking-[0.06em] font-semibold">
      {status}
    </Badge>
  );
}

export function OrgBranches() {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const { t } = useTranslation();
  const currentOrgId = orgId || "vcuwjtqppzztgjwtvmta";
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filtered = mockBranches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-[22px] font-semibold mb-6">{t("branches.title")}</h1>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <div className="relative w-[240px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
          <Input
            placeholder={t("branches.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Button variant="secondary" size="sm">
          {t("branches.status")}
          <ChevronDown size={13} className="text-subtle" />
        </Button>

        <Button variant="secondary" size="sm">
          <ArrowUpDown size={13} />
          {t("branches.sortedByName")}
        </Button>

        <div className="flex-1" />

        {/* View toggle */}
        <div className="flex items-center rounded-lg overflow-hidden border border-border bg-card">
          <button
            onClick={() => setView("grid")}
            className={`px-2.5 py-2 transition-colors ${
              view === "grid" ? "text-foreground bg-border" : "text-subtle"
            }`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-2.5 py-2 transition-colors ${
              view === "list" ? "text-foreground bg-border" : "text-subtle"
            }`}
          >
            <List size={14} />
          </button>
        </div>

        <Button>
          <Plus size={15} />
          {t("branches.newBranch")}
        </Button>
      </div>

      {/* Branches */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((branch) => (
            <Card
              key={branch.id}
              className="p-5 cursor-pointer hover:border-white/20 transition-all group"
              onClick={() => navigate(`/dashboard/org/${currentOrgId}/branch/${branch.id}`)}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-medium">{branch.name}</h3>
                  <p className="text-xs mt-0.5 text-subtle">{branch.region}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(menuOpen === branch.id ? null : branch.id);
                  }}
                  className="p-1 rounded hover:bg-white/10 transition-colors text-subtle opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal size={15} />
                </button>
              </div>

              <StatusBadge status={branch.status} />

              {/* Status info */}
              <div className="flex items-center gap-2 mt-4 text-subtle">
                <PauseCircle size={15} />
                <span className="text-xs">
                  {branch.status === "PAUSED" ? t("branches.branchPaused") : t("branches.branchRunning")}
                </span>
                <Info size={12} />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-dark border-b border-border">
                <th className="text-left px-4 py-3 text-xs text-subtle font-medium tracking-[0.05em]">{t("branches.tableHeaders.name")}</th>
                <th className="text-left px-4 py-3 text-xs text-subtle font-medium tracking-[0.05em]">{t("branches.tableHeaders.region")}</th>
                <th className="text-left px-4 py-3 text-xs text-subtle font-medium tracking-[0.05em]">{t("branches.tableHeaders.status")}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((branch, i) => (
                <tr
                  key={branch.id}
                  className={`bg-card hover:bg-white/5 transition-colors cursor-pointer ${
                    i < filtered.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium">{branch.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-subtle">{branch.region}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={branch.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 rounded hover:bg-white/10 text-subtle">
                      <MoreHorizontal size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-subtle">
          <p className="text-sm">{t("branches.noResults")}</p>
        </div>
      )}
    </div>
  );
}
