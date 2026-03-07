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
      <h1 className="text-white mb-6" style={{ fontSize: "22px", fontWeight: 600 }}>
        Organization Settings
      </h1>

      {/* General section */}
      <section className="mb-8">
        <h2 className="text-xs mb-4" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.07em" }}>
          GENERAL
        </h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #2e2e2e" }}
        >
          {/* Name */}
          <div
            className="p-5"
            style={{ borderBottom: "1px solid #2e2e2e", backgroundColor: "#1e1e1e" }}
          >
            <label className="block text-sm mb-1.5" style={{ color: "#d4d4d4", fontWeight: 500 }}>
              Organization name
            </label>
            <p className="text-xs mb-3" style={{ color: "#737373" }}>
              This is your organization's display name across the platform.
            </p>
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "#171717",
                border: "1px solid #2e2e2e",
                color: "#d4d4d4",
                padding: "8px 12px",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "#3ecf8e55")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "#2e2e2e")
              }
            />
          </div>

          {/* Slug */}
          <div
            className="p-5"
            style={{ backgroundColor: "#1e1e1e" }}
          >
            <label className="block text-sm mb-1.5" style={{ color: "#d4d4d4", fontWeight: 500 }}>
              Organization slug
            </label>
            <p className="text-xs mb-3" style={{ color: "#737373" }}>
              Used in URLs and API references. Changing this will update all existing links.
            </p>
            <div
              className="flex items-center rounded-lg overflow-hidden"
              style={{ border: "1px solid #2e2e2e", backgroundColor: "#171717" }}
            >
              <span
                className="px-3 py-2 text-sm flex-shrink-0 select-none"
                style={{
                  borderRight: "1px solid #2e2e2e",
                  backgroundColor: "#1a1a1a",
                  color: "#555",
                }}
              >
                org/
              </span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "#d4d4d4", padding: "8px 12px" }}
              />
            </div>
          </div>

          {/* Save footer */}
          <div
            className="px-5 py-3 flex justify-end"
            style={{ borderTop: "1px solid #2e2e2e", backgroundColor: "#1a1a1a" }}
          >
            <button
              className="px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#3ecf8e22",
                border: "1px solid #3ecf8e55",
                color: "#3ecf8e",
                fontWeight: 500,
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <h2 className="text-xs mb-4" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.07em" }}>
          DANGER ZONE
        </h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #7f1d1d55" }}
        >
          <div
            className="p-5"
            style={{ backgroundColor: "#1e1e1e" }}
          >
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#f87171" }} />
              <div>
                <p className="text-sm" style={{ color: "#d4d4d4", fontWeight: 500 }}>
                  Delete this organization
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "#737373" }}>
                  Permanently delete this organization and all associated branches, members, and data. This
                  action cannot be undone.
                </p>
              </div>
            </div>

            <label className="block text-xs mb-1.5" style={{ color: "#a3a3a3" }}>
              Type <span style={{ color: "#d4d4d4" }}>delete</span> to confirm
            </label>
            <input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="delete"
              className="w-full rounded-lg text-sm outline-none mb-3"
              style={{
                backgroundColor: "#171717",
                border: "1px solid #7f1d1d55",
                color: "#d4d4d4",
                padding: "8px 12px",
              }}
            />
            <button
              disabled={deleteConfirm !== "delete"}
              className="px-4 py-2 rounded-lg text-sm transition-opacity"
              style={{
                backgroundColor: deleteConfirm === "delete" ? "#7f1d1d" : "#2a2a2a",
                border: `1px solid ${deleteConfirm === "delete" ? "#ef444444" : "#333"}`,
                color: deleteConfirm === "delete" ? "#fca5a5" : "#555",
                cursor: deleteConfirm === "delete" ? "pointer" : "not-allowed",
                fontWeight: 500,
              }}
            >
              Delete organization
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
