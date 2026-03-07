import { useState } from "react";
import { useParams } from "react-router";
import {
  Pause,
  Play,
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  Users,
  FileText,
  Activity,
  Globe,
  Clock,
  ExternalLink,
} from "lucide-react";

const mockBranches: Record<string, { name: string; status: string; region: string; pausedDate: string; resumeDeadline: string }> = {
  "branch-01": {
    name: "acme-crm",
    status: "ACTIVE",
    region: "EU | eu-central-1",
    pausedDate: "",
    resumeDeadline: "",
  },
  "branch-02": {
    name: "acme-api",
    status: "PAUSED",
    region: "EU | eu-central-1",
    pausedDate: "01 Mar 2026",
    resumeDeadline: "30 May 2026",
  },
  "branch-03": {
    name: "supplier-portal",
    status: "ACTIVE",
    region: "US | us-east-1",
    pausedDate: "",
    resumeDeadline: "",
  },
  "branch-04": {
    name: "vendor-hub",
    status: "PAUSED",
    region: "US | us-east-1",
    pausedDate: "15 Feb 2026",
    resumeDeadline: "15 May 2026",
  },
};

const statsActive = [
  { icon: Users, label: "Suppliers", value: "142", change: "+4 this week" },
  { icon: FileText, label: "Documents", value: "1,089", change: "+23 this week" },
  { icon: GitBranch, label: "Active Workflows", value: "8", change: "2 pending" },
  { icon: Activity, label: "API Requests", value: "24.3K", change: "Last 24 hours" },
];

const activityFeed = [
  { id: 1, user: "sarah.johnson", action: "added a new supplier", target: "Brightfield Materials", time: "2 mins ago" },
  { id: 2, user: "mike.chen", action: "updated contract for", target: "Vertex Logistics", time: "18 mins ago" },
  { id: 3, user: "sarah.johnson", action: "approved onboarding for", target: "Nexova Supplies", time: "1 hour ago" },
  { id: 4, user: "admin", action: "ran compliance check on", target: "All tier-1 suppliers", time: "3 hours ago" },
];

export function BranchOverview() {
  const { branchId } = useParams();
  const branch = mockBranches[branchId || "branch-01"] || mockBranches["branch-01"];
  const isPaused = branch.status === "PAUSED";
  const [resuming, setResuming] = useState(false);

  const handleResume = () => {
    setResuming(true);
    setTimeout(() => setResuming(false), 2000);
  };

  if (isPaused) {
    return (
      <div className="flex items-center justify-center min-h-full p-8" style={{ minHeight: "calc(100vh - 48px)" }}>
        <div
          className="w-full max-w-xl rounded-xl p-8"
          style={{ backgroundColor: "#1e1e1e", border: "1px solid #2e2e2e" }}
        >
          {/* Pause icon */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
            style={{ border: "1px solid #2e2e2e", backgroundColor: "#252525" }}
          >
            <Pause size={20} style={{ color: "#737373" }} />
          </div>

          {/* Title */}
          <h2 className="text-white mb-4" style={{ fontSize: "18px", fontWeight: 600 }}>
            The branch &ldquo;{branch.name}&rdquo; is currently paused
          </h2>

          {/* Body text */}
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#737373" }}>
            All data, including records, documents, and workflow history, remains safe. You can resume
            this branch from the dashboard within{" "}
            <span style={{ color: "#d4d4d4", fontWeight: 500 }}>87 days</span>{" "}
            (until{" "}
            <span style={{ color: "#d4d4d4", fontWeight: 500 }}>{branch.resumeDeadline}</span>). After
            that, this branch will not be resumable, but data will still be available for download.
          </p>

          <p className="text-sm leading-relaxed mb-1" style={{ color: "#737373" }}>
            To prevent future pauses, consider upgrading to Pro.
          </p>
          <p className="text-xs mb-8" style={{ color: "#555" }}>
            Branch last paused on {branch.pausedDate}
          </p>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #2e2e2e" }} className="mb-6" />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-2 text-sm"
              style={{ color: "#737373" }}
            >
              <ExternalLink size={13} />
              Learn more
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResume}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
                style={{ border: "1px solid #2e2e2e", color: "#d4d4d4" }}
              >
                {resuming ? (
                  <>
                    <div
                      className="w-3 h-3 rounded-full border-t border-white animate-spin"
                      style={{ borderColor: "#3ecf8e", borderTopColor: "transparent" }}
                    />
                    Resuming…
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    Resume branch
                  </>
                )}
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "#3ecf8e",
                  color: "#0a0a0a",
                  fontWeight: 600,
                }}
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active branch overview
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 size={15} style={{ color: "#3ecf8e" }} />
            <span className="text-xs" style={{ color: "#3ecf8e", fontWeight: 500 }}>
              Active
            </span>
          </div>
          <h1 className="text-white" style={{ fontSize: "22px", fontWeight: 600 }}>
            {branch.name}
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Globe size={12} style={{ color: "#555" }} />
            <span className="text-xs" style={{ color: "#555" }}>
              {branch.region}
            </span>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
          style={{ border: "1px solid #2e2e2e", color: "#a3a3a3" }}
        >
          <AlertTriangle size={13} style={{ color: "#a37c52" }} />
          Pause branch
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {statsActive.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl"
            style={{ backgroundColor: "#1e1e1e", border: "1px solid #2e2e2e" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <stat.icon size={14} style={{ color: "#555" }} />
              <span className="text-xs" style={{ color: "#737373" }}>
                {stat.label}
              </span>
            </div>
            <p className="text-white mb-1" style={{ fontSize: "22px", fontWeight: 600 }}>
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: "#555" }}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 340px" }}>
        {/* Activity feed */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #2e2e2e" }}
        >
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid #2e2e2e", backgroundColor: "#1a1a1a" }}
          >
            <span className="text-xs" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.06em" }}>
              RECENT ACTIVITY
            </span>
            <button className="text-xs hover:underline" style={{ color: "#3ecf8e" }}>
              View all
            </button>
          </div>
          {activityFeed.map((item, i) => (
            <div
              key={item.id}
              className="px-5 py-4 flex items-start gap-3"
              style={{
                backgroundColor: "#1e1e1e",
                borderBottom: i < activityFeed.length - 1 ? "1px solid #2e2e2e" : "none",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "#262626", border: "1px solid #333" }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <circle cx="12" cy="8" r="3.5" stroke="#a3a3a3" strokeWidth="1.3" />
                  <path d="M4 20c0-4.418 3.582-7 8-7s8 2.582 8 7" stroke="#a3a3a3" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug" style={{ color: "#a3a3a3" }}>
                  <span style={{ color: "#d4d4d4", fontWeight: 500 }}>{item.user}</span>{" "}
                  {item.action}{" "}
                  <span style={{ color: "#3ecf8e" }}>{item.target}</span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={11} style={{ color: "#444" }} />
                  <span className="text-xs" style={{ color: "#444" }}>
                    {item.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right column: quick links */}
        <div className="space-y-4">
          {/* Branch health */}
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: "#1e1e1e", border: "1px solid #2e2e2e" }}
          >
            <p className="text-xs mb-3" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.06em" }}>
              BRANCH HEALTH
            </p>
            {[
              { label: "API Response", value: "98ms", ok: true },
              { label: "Data Sync", value: "Healthy", ok: true },
              { label: "Integrations", value: "2 / 2 online", ok: true },
              { label: "Compliance Score", value: "84%", ok: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: "1px solid #222" }}
              >
                <span className="text-xs" style={{ color: "#737373" }}>
                  {item.label}
                </span>
                <span
                  className="text-xs"
                  style={{ color: item.ok ? "#3ecf8e" : "#a37c52", fontWeight: 500 }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: "#1e1e1e", border: "1px solid #2e2e2e" }}
          >
            <p className="text-xs mb-3" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.06em" }}>
              QUICK ACTIONS
            </p>
            <div className="space-y-2">
              {[
                "Add a supplier",
                "Run compliance check",
                "Export supplier data",
                "Invite a team member",
              ].map((action) => (
                <button
                  key={action}
                  className="w-full text-left text-sm px-3 py-2 rounded-lg transition-colors hover:bg-white/5"
                  style={{ color: "#a3a3a3", border: "1px solid #2a2a2a" }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
