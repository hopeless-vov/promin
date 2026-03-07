import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../components/TopNav";
import { OrganizationCard } from "../components/OrganizationCard";
import { Search, Plus } from "lucide-react";

const mockOrgs = [
  { id: "vcuwjtqppzztgjwtvmta", name: "Acme Corp", plan: "Free Plan", branches: 2 },
  { id: "oeasvtzqxumzbhtcqtmu", name: "GlobalTrade", plan: "Free Plan", branches: 2 },
];

export function Organizations() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filtered = mockOrgs.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col text-white">
      <TopNav variant="plain" title="Organizations" />

      <div className="px-8 py-12 max-w-5xl mx-auto w-full">
        <h1 className="text-white text-[26px] font-semibold mb-8">Your Organizations</h1>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-app-border w-[280px]">
            <Search size={14} className="text-[#555] flex-shrink-0" />
            <input
              placeholder="Search for an organization"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1 text-neutral-300"
            />
          </div>

          <button
            onClick={() => navigate("/dashboard/new")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90"
          >
            <Plus size={15} />
            New organization
          </button>
        </div>

        {/* Org grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((org) => (
            <OrganizationCard key={org.id} org={org} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#555]">
            <p className="text-sm">No organizations found</p>
          </div>
        )}
      </div>
    </div>
  );
}