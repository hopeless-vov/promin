import { useState } from "react";
import { useNavigate, useParams } from "react-router";
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

const mockBranches = [
  { id: "branch-01", name: "acme-crm", region: "EU | eu-central-1", status: "ACTIVE" },
  { id: "branch-02", name: "acme-api", region: "EU | eu-central-1", status: "PAUSED" },
  { id: "branch-03", name: "supplier-portal", region: "US | us-east-1", status: "ACTIVE" },
  { id: "branch-04", name: "vendor-hub", region: "US | us-east-1", status: "PAUSED" },
];

function StatusBadge({ status }: { status: string }) {
  const isPaused = status === "PAUSED";
  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded font-semibold tracking-[0.06em] ${
        isPaused
          ? "bg-[#2a2520] text-[#a37c52] border border-[#3d2e1a]"
          : "bg-[#1a2e1a] text-[#4caf87] border border-[#1e4d2e]"
      }`}
    >
      {status}
    </span>
  );
}

export function OrgBranches() {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const currentOrgId = orgId || "vcuwjtqppzztgjwtvmta";
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filtered = mockBranches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 text-white">
      <h1 className="text-white text-[22px] font-semibold mb-6">Branches</h1>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-app-border w-[240px]">
          <Search size={13} className="text-[#555] flex-shrink-0" />
          <input
            placeholder="Search for a branch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1 text-neutral-300"
          />
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm bg-surface border border-app-border text-neutral-300">
          Status
          <ChevronDown size={13} className="text-[#555]" />
        </button>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm bg-surface border border-app-border text-neutral-300">
          <ArrowUpDown size={13} />
          Sorted by name
        </button>

        <div className="flex-1" />

        {/* View toggle */}
        <div className="flex items-center rounded-lg overflow-hidden border border-app-border bg-surface">
          <button
            onClick={() => setView("grid")}
            className={`px-2.5 py-2 transition-colors ${
              view === "grid" ? "text-white bg-[#2e2e2e]" : "text-[#555]"
            }`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-2.5 py-2 transition-colors ${
              view === "list" ? "text-white bg-[#2e2e2e]" : "text-[#555]"
            }`}
          >
            <List size={14} />
          </button>
        </div>

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90">
          <Plus size={15} />
          New branch
        </button>
      </div>

      {/* Branches */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((branch) => (
            <div
              key={branch.id}
              className="relative rounded-xl p-5 cursor-pointer bg-surface border border-app-border hover:border-white/20 transition-all group"
              onClick={() => navigate(`/dashboard/org/${currentOrgId}/branch/${branch.id}`)}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white text-sm font-medium">{branch.name}</h3>
                  <p className="text-xs mt-0.5 text-[#555]">{branch.region}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(menuOpen === branch.id ? null : branch.id);
                  }}
                  className="p-1 rounded hover:bg-white/10 transition-colors text-[#555] opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal size={15} />
                </button>
              </div>

              <StatusBadge status={branch.status} />

              {/* Status info */}
              <div className="flex items-center gap-2 mt-4 text-[#555]">
                <PauseCircle size={15} />
                <span className="text-xs">
                  {branch.status === "PAUSED" ? "Branch is paused" : "Branch is running"}
                </span>
                <Info size={12} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-app-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-dark border-b border-app-border">
                <th className="text-left px-4 py-3 text-xs text-[#555] font-medium tracking-[0.05em]">NAME</th>
                <th className="text-left px-4 py-3 text-xs text-[#555] font-medium tracking-[0.05em]">REGION</th>
                <th className="text-left px-4 py-3 text-xs text-[#555] font-medium tracking-[0.05em]">STATUS</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((branch, i) => (
                <tr
                  key={branch.id}
                  className={`bg-surface hover:bg-white/5 transition-colors cursor-pointer ${
                    i < filtered.length - 1 ? "border-b border-app-border" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="text-white text-sm font-medium">{branch.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#555]">{branch.region}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={branch.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 rounded hover:bg-white/10 text-[#555]">
                      <MoreHorizontal size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#555]">
          <p className="text-sm">No branches found</p>
        </div>
      )}
    </div>
  );
}
