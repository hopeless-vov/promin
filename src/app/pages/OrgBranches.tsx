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
  {
    id: "branch-01",
    name: "acme-crm",
    region: "EU | eu-central-1",
    status: "ACTIVE",
  },
  {
    id: "branch-02",
    name: "acme-api",
    region: "EU | eu-central-1",
    status: "PAUSED",
  },
  {
    id: "branch-03",
    name: "supplier-portal",
    region: "US | us-east-1",
    status: "ACTIVE",
  },
  {
    id: "branch-04",
    name: "vendor-hub",
    region: "US | us-east-1",
    status: "PAUSED",
  },
];

function StatusBadge({ status }: { status: string }) {
  const isPaused = status === "PAUSED";
  return (
    <span
      className="text-xs px-2 py-0.5 rounded"
      style={{
        backgroundColor: isPaused ? "#2a2520" : "#1a2e1a",
        color: isPaused ? "#a37c52" : "#4caf87",
        border: `1px solid ${isPaused ? "#3d2e1a" : "#1e4d2e"}`,
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.06em",
      }}
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
    <div className="p-8" style={{ color: "#fff" }}>
      <h1 className="text-white mb-6" style={{ fontSize: "22px", fontWeight: 600 }}>
        Branches
      </h1>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: "#1e1e1e",
            border: "1px solid #2e2e2e",
            width: "240px",
          }}
        >
          <Search size={13} style={{ color: "#555" }} />
          <input
            placeholder="Search for a branch"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1"
            style={{ color: "#d4d4d4" }}
          />
        </div>

        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: "#1e1e1e",
            border: "1px solid #2e2e2e",
            color: "#d4d4d4",
          }}
        >
          Status
          <ChevronDown size={13} style={{ color: "#555" }} />
        </button>

        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: "#1e1e1e",
            border: "1px solid #2e2e2e",
            color: "#d4d4d4",
          }}
        >
          <ArrowUpDown size={13} />
          Sorted by name
        </button>

        <div className="flex-1" />

        {/* View toggle */}
        <div
          className="flex items-center rounded-lg overflow-hidden"
          style={{ border: "1px solid #2e2e2e", backgroundColor: "#1e1e1e" }}
        >
          <button
            onClick={() => setView("grid")}
            className="px-2.5 py-2 transition-colors"
            style={{
              color: view === "grid" ? "#fff" : "#555",
              backgroundColor: view === "grid" ? "#2e2e2e" : "transparent",
            }}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setView("list")}
            className="px-2.5 py-2 transition-colors"
            style={{
              color: view === "list" ? "#fff" : "#555",
              backgroundColor: view === "list" ? "#2e2e2e" : "transparent",
            }}
          >
            <List size={14} />
          </button>
        </div>

        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "#3ecf8e22",
            border: "1px solid #3ecf8e55",
            color: "#3ecf8e",
            fontWeight: 500,
          }}
        >
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
              className="relative rounded-xl p-5 cursor-pointer hover:border-opacity-60 transition-all group"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #2e2e2e",
              }}
              onClick={() => navigate(`/dashboard/org/${currentOrgId}/branch/${branch.id}`)}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white text-sm" style={{ fontWeight: 500 }}>
                    {branch.name}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "#555" }}>
                    {branch.region}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(menuOpen === branch.id ? null : branch.id);
                  }}
                  className="p-1 rounded hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                  style={{ color: "#555" }}
                >
                  <MoreHorizontal size={15} />
                </button>
              </div>

              <StatusBadge status={branch.status} />

              {/* Status info */}
              <div className="flex items-center gap-2 mt-4" style={{ color: "#555" }}>
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
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #2e2e2e" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "1px solid #2e2e2e" }}>
                <th className="text-left px-4 py-3 text-xs" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.05em" }}>
                  NAME
                </th>
                <th className="text-left px-4 py-3 text-xs" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.05em" }}>
                  REGION
                </th>
                <th className="text-left px-4 py-3 text-xs" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.05em" }}>
                  STATUS
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((branch, i) => (
                <tr
                  key={branch.id}
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                  style={{
                    backgroundColor: "#1e1e1e",
                    borderBottom: i < filtered.length - 1 ? "1px solid #2e2e2e" : "none",
                  }}
                >
                  <td className="px-4 py-3">
                    <span className="text-white text-sm" style={{ fontWeight: 500 }}>{branch.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: "#555" }}>{branch.region}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={branch.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="p-1 rounded hover:bg-white/10"
                      style={{ color: "#555" }}
                    >
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
        <div className="text-center py-16" style={{ color: "#555" }}>
          <p className="text-sm">No branches found</p>
        </div>
      )}
    </div>
  );
}