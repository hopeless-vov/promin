import { useState } from "react";
import { useParams } from "react-router";
import { AlertTriangle } from "lucide-react";

export function OrgSettings() {
  const { orgId } = useParams();
  const [orgName, setOrgName] = useState("Acme Corp");
  const [slug, setSlug] = useState(orgId || "");
  const [deleteConfirm, setDeleteConfirm] = useState("");

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-white text-[22px] font-semibold mb-6">Organization Settings</h1>

      {/* General section */}
      <section className="mb-8">
        <h2 className="text-xs mb-4 text-[#555] font-medium tracking-[0.07em]">GENERAL</h2>
        <div className="rounded-xl overflow-hidden border border-app-border">
          {/* Name */}
          <div className="p-5 border-b border-app-border bg-surface">
            <label className="block text-sm mb-1.5 text-neutral-300 font-medium">
              Organization name
            </label>
            <p className="text-xs mb-3 text-neutral-500">
              This is your organization's display name across the platform.
            </p>
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full rounded-lg text-sm outline-none px-3 py-2 bg-neutral-900 border border-app-border text-neutral-300 focus:border-brand transition-[border-color]"
            />
          </div>

          {/* Slug */}
          <div className="p-5 bg-surface">
            <label className="block text-sm mb-1.5 text-neutral-300 font-medium">
              Organization slug
            </label>
            <p className="text-xs mb-3 text-neutral-500">
              Used in URLs and API references. Changing this will update all existing links.
            </p>
            <div className="flex items-center rounded-lg overflow-hidden border border-app-border bg-neutral-900">
              <span className="px-3 py-2 text-sm flex-shrink-0 select-none border-r border-app-border bg-surface-dark text-[#555]">
                org/
              </span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent px-3 py-2 text-neutral-300"
              />
            </div>
          </div>

          {/* Save footer */}
          <div className="px-5 py-3 flex justify-end border-t border-app-border bg-surface-dark">
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90">
              Save changes
            </button>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <h2 className="text-xs mb-4 text-[#555] font-medium tracking-[0.07em]">DANGER ZONE</h2>
        <div className="rounded-xl overflow-hidden border border-red-900/33">
          <div className="p-5 bg-surface">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-red-400" />
              <div>
                <p className="text-sm text-neutral-300 font-medium">Delete this organization</p>
                <p className="text-xs mt-1 leading-relaxed text-neutral-500">
                  Permanently delete this organization and all associated branches, members, and data. This
                  action cannot be undone.
                </p>
              </div>
            </div>

            <label className="block text-xs mb-1.5 text-neutral-400">
              Type <span className="text-neutral-300">delete</span> to confirm
            </label>
            <input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="delete"
              className="w-full rounded-lg text-sm outline-none mb-3 px-3 py-2 bg-neutral-900 border border-red-900/33 text-neutral-300"
            />
            <button
              disabled={deleteConfirm !== "delete"}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-opacity ${
                deleteConfirm === "delete"
                  ? "bg-red-900/50 border border-red-500/27 text-red-300 cursor-pointer"
                  : "bg-[#2a2a2a] border border-[#333] text-[#555] cursor-not-allowed"
              }`}
            >
              Delete organization
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
