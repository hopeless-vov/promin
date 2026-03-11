import { useState } from "react";
import { useParams } from "react-router";
import { AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

export function OrgSettings() {
  const { orgId } = useParams();
  const [orgName, setOrgName] = useState("Acme Corp");
  const [slug, setSlug] = useState(orgId || "");
  const [deleteConfirm, setDeleteConfirm] = useState("");

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-[22px] font-semibold mb-6">Organization Settings</h1>

      {/* General section */}
      <section className="mb-8">
        <h2 className="text-xs mb-4 text-subtle font-medium tracking-[0.07em]">GENERAL</h2>
        <Card className="overflow-hidden">
          {/* Name */}
          <div className="p-5">
            <label className="block text-sm mb-1.5 text-secondary-foreground font-medium">
              Organization name
            </label>
            <p className="text-xs mb-3 text-muted-foreground">
              This is your organization's display name across the platform.
            </p>
            <Input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>

          <Separator />

          {/* Slug */}
          <div className="p-5">
            <label className="block text-sm mb-1.5 text-secondary-foreground font-medium">
              Organization slug
            </label>
            <p className="text-xs mb-3 text-muted-foreground">
              Used in URLs and API references. Changing this will update all existing links.
            </p>
            <div className="flex items-center rounded-lg overflow-hidden border border-border bg-card">
              <span className="px-3 py-2 text-sm flex-shrink-0 select-none border-r border-border bg-surface-dark text-subtle">
                org/
              </span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent px-3 py-2 text-secondary-foreground"
              />
            </div>
          </div>

          {/* Save footer */}
          <Separator />
          <div className="px-5 py-3 flex justify-end bg-surface-dark">
            <Button>Save changes</Button>
          </div>
        </Card>
      </section>

      {/* Danger zone */}
      <section>
        <h2 className="text-xs mb-4 text-subtle font-medium tracking-[0.07em]">DANGER ZONE</h2>
        <Card className="overflow-hidden border-red-900/33">
          <div className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-red-400" />
              <div>
                <p className="text-sm text-secondary-foreground font-medium">Delete this organization</p>
                <p className="text-xs mt-1 leading-relaxed text-muted-foreground">
                  Permanently delete this organization and all associated branches, members, and data. This
                  action cannot be undone.
                </p>
              </div>
            </div>

            <label className="block text-xs mb-1.5 text-muted-foreground">
              Type <span className="text-secondary-foreground">delete</span> to confirm
            </label>
            <Input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="delete"
              className="mb-3 border-red-900/33"
            />
            <Button
              variant={deleteConfirm === "delete" ? "destructive" : "outline"}
              disabled={deleteConfirm !== "delete"}
            >
              Delete organization
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
