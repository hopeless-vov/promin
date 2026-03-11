import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../components/TopNav";
import { ChevronDown } from "lucide-react";
import { useCreateOrganization } from "../../hooks/useOrganizations";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

export function NewOrganization() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [orgType, setOrgType] = useState("Personal");
  const [plan, setPlan] = useState("Free - $0/month");
  const createOrg = useCreateOrganization();
  const [error, setError] = useState("");

  return (
    <div>
      <TopNav variant="plain" title="New organization" />

      <div className="flex items-start justify-center px-6 py-12">
        <Card className="w-full max-w-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5">
            <h2 className="text-base font-semibold mb-1">Create a new organization</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Organizations are a way to group your branches together. Each organization can be
              configured with different team members and billing settings.
            </p>
          </div>

          <Separator />

          {/* Name field */}
          <div className="px-6 py-5 grid grid-cols-3 gap-6 items-start">
            <div>
              <label className="text-sm font-medium text-secondary-foreground">Name</label>
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Organization name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-xs mt-2 text-subtle">
                What's the name of your company or team? You can change this later.
              </p>
            </div>
          </div>

          <Separator />

          {/* Type field */}
          <div className="px-6 py-5 grid grid-cols-3 gap-6 items-start">
            <div>
              <label className="text-sm font-medium text-secondary-foreground">Type</label>
            </div>
            <div className="col-span-2">
              <div className="relative">
                <select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value)}
                  className="w-full appearance-none rounded-md text-sm bg-card border border-border text-secondary-foreground pl-3 pr-9 py-2.5 outline-none focus:border-ring transition-[border-color] cursor-pointer"
                >
                  <option>Personal</option>
                  <option>Company</option>
                  <option>Agency</option>
                  <option>Non-profit</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-subtle"
                />
              </div>
              <p className="text-xs mt-2 text-subtle">What best describes your organization?</p>
            </div>
          </div>

          <Separator />

          {/* Plan field */}
          <div className="px-6 py-5 grid grid-cols-3 gap-6 items-start">
            <div>
              <label className="text-sm font-medium text-secondary-foreground">Plan</label>
            </div>
            <div className="col-span-2">
              <div className="relative">
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full appearance-none rounded-md text-sm bg-card border border-border text-secondary-foreground pl-3 pr-9 py-2.5 outline-none focus:border-ring transition-[border-color] cursor-pointer"
                >
                  <option>Free - $0/month</option>
                  <option>Pro - $25/month</option>
                  <option>Team - $599/month</option>
                  <option>Enterprise - Custom</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-subtle"
                />
              </div>
              <p className="text-xs mt-2 text-subtle">
                Which plan fits your organization's needs best?{" "}
                <a href="#" className="underline hover:opacity-80 text-muted-foreground">
                  Learn more
                </a>
                .
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <>
              <Separator />
              <div className="px-6 py-3 text-sm text-red-400">
                {error}
              </div>
            </>
          )}

          {/* Footer */}
          <Separator />
          <div className="px-6 py-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/organizations")}
            >
              Cancel
            </Button>
            <Button
              disabled={createOrg.isPending || !name.trim()}
              onClick={async () => {
                setError("");
                try {
                  const org = await createOrg.mutateAsync({ name: name.trim(), type: orgType });
                  navigate(`/dashboard/org/${org.id}`);
                } catch (e: any) {
                  setError(e.message || "Failed to create organization");
                }
              }}
            >
              {createOrg.isPending ? "Creating..." : "Create organization"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}