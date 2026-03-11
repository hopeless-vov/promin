import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../components/TopNav";
import { OrganizationCard } from "../components/OrganizationCard";
import { Search, Plus } from "lucide-react";
import { useOrganizations } from "../../hooks/useOrganizations";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function Organizations() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { data: orgs = [], isLoading } = useOrganizations();

  const filtered = orgs.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <TopNav variant="plain" title="Organizations" />

      <div className="px-8 py-12 max-w-5xl mx-auto w-full">
        <h1 className="text-[26px] font-semibold mb-8">Your Organizations</h1>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-[280px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <Input
              placeholder="Search for an organization"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Button onClick={() => navigate("/dashboard/new")}>
            <Plus size={15} />
            New organization
          </Button>
        </div>

        {/* Org grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((org) => (
            <OrganizationCard key={org.id} org={org} />
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-16 text-subtle">
            <p className="text-sm">Loading organizations...</p>
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16 text-subtle">
            <p className="text-sm">No organizations found</p>
          </div>
        )}
      </div>
    </div>
  );
}