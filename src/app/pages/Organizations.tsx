import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { TopNav } from "../components/TopNav";
import { Search, Plus } from "lucide-react";

const mockOrgs = [
  {
    id: "vcuwjtqppzztgjwtvmta",
    name: "Acme Corp",
    plan: "Free Plan",
    branches: 2,
  },
  {
    id: "oeasvtzqxumzbhtcqtmu",
    name: "GlobalTrade",
    plan: "Free Plan",
    branches: 2,
  },
];

function OrgIcon() {
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: "#2a2a2a", border: "1px solid #383838" }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="8" r="3.5" stroke="#a3a3a3" strokeWidth="1.3" />
        <path d="M4 20c0-4.418 3.582-7 8-7s8 2.582 8 7" stroke="#a3a3a3" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="19" cy="14" r="2" stroke="#a3a3a3" strokeWidth="1.1" />
        <circle cx="5" cy="14" r="2" stroke="#a3a3a3" strokeWidth="1.1" />
      </svg>
    </div>
  );
}

export function Organizations() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filtered = mockOrgs.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col" style={{ color: "#fff" }}>
      <TopNav variant="plain" title="Organizations" />

      <div className="px-8 py-12 max-w-5xl mx-auto w-full">
        <h1
          className="text-white mb-8"
          style={{ fontSize: "26px", fontWeight: 600 }}
        >
          Your Organizations
        </h1>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              backgroundColor: "#1e1e1e",
              border: "1px solid #2e2e2e",
              width: "280px",
            }}
          >
            <Search size={14} style={{ color: "#555" }} />
            <input
              placeholder="Search for an organization"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
              style={{ color: "#d4d4d4" }}
            />
          </div>

          <button
            onClick={() => navigate("/dashboard/new")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#3ecf8e22",
              border: "1px solid #3ecf8e55",
              color: "#3ecf8e",
              fontWeight: 500,
            }}
          >
            <Plus size={15} />
            New organization
          </button>
        </div>

        {/* Org grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((org) => (
            <Link
              key={org.id}
              to={`/dashboard/org/${org.id}`}
              className="flex items-center gap-3 p-4 rounded-lg transition-colors hover:bg-white/5"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #2e2e2e",
              }}
            >
              <OrgIcon />
              <div>
                <p className="text-white text-sm" style={{ fontWeight: 500 }}>
                  {org.name}
                </p>
                <p className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: "#a3a3a3" }}>
                  {org.plan}
                  <span style={{ color: "#383838" }}>•</span>
                  {org.branches} branches
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "#555" }}>
            <p className="text-sm">No organizations found</p>
          </div>
        )}
      </div>
    </div>
  );
}