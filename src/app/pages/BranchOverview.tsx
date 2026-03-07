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
  "branch-01": { name: "acme-crm", status: "ACTIVE", region: "EU | eu-central-1", pausedDate: "", resumeDeadline: "" },
  "branch-02": { name: "acme-api", status: "PAUSED", region: "EU | eu-central-1", pausedDate: "01 Mar 2026", resumeDeadline: "30 May 2026" },
  "branch-03": { name: "supplier-portal", status: "ACTIVE", region: "US | us-east-1", pausedDate: "", resumeDeadline: "" },
  "branch-04": { name: "vendor-hub", status: "PAUSED", region: "US | us-east-1", pausedDate: "15 Feb 2026", resumeDeadline: "15 May 2026" },
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
      <div className="flex items-center justify-center min-h-[calc(100vh-48px)] p-8">
        <div className="w-full max-w-xl rounded-xl p-8 bg-surface border border-app-border">
          {/* Pause icon */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 border border-app-border bg-[#252525]">
            <Pause size={20} className="text-neutral-500" />
          </div>

          <h2 className="text-white text-lg font-semibold mb-4">
            The branch &ldquo;{branch.name}&rdquo; is currently paused
          </h2>

          <p className="text-sm leading-relaxed mb-3 text-neutral-500">
            All data, including records, documents, and workflow history, remains safe. You can resume
            this branch from the dashboard within{" "}
            <span className="text-neutral-300 font-medium">87 days</span>{" "}
            (until{" "}
            <span className="text-neutral-300 font-medium">{branch.resumeDeadline}</span>). After
            that, this branch will not be resumable, but data will still be available for download.
          </p>

          <p className="text-sm leading-relaxed mb-1 text-neutral-500">
            To prevent future pauses, consider upgrading to Pro.
          </p>
          <p className="text-xs mb-8 text-[#555]">Branch last paused on {branch.pausedDate}</p>

          <div className="border-t border-app-border mb-6" />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-sm text-neutral-500">
              <ExternalLink size={13} />
              Learn more
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResume}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-app-border text-neutral-300 transition-colors hover:bg-white/5"
              >
                {resuming ? (
                  <>
                    <div className="w-3 h-3 rounded-full border border-brand border-t-transparent animate-spin" />
                    Resuming…
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    Resume branch
                  </>
                )}
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-brand text-neutral-950 transition-opacity hover:opacity-90">
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
            <CheckCircle2 size={15} className="text-brand" />
            <span className="text-xs text-brand font-medium">Active</span>
          </div>
          <h1 className="text-white text-[22px] font-semibold">{branch.name}</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Globe size={12} className="text-[#555]" />
            <span className="text-xs text-[#555]">{branch.region}</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-app-border text-neutral-400 transition-colors hover:bg-white/5">
          <AlertTriangle size={13} className="text-[#a37c52]" />
          Pause branch
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {statsActive.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-surface border border-app-border">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon size={14} className="text-[#555]" />
              <span className="text-xs text-neutral-500">{stat.label}</span>
            </div>
            <p className="text-white text-[22px] font-semibold mb-1">{stat.value}</p>
            <p className="text-xs text-[#555]">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 340px" }}>
        {/* Activity feed */}
        <div className="rounded-xl overflow-hidden border border-app-border">
          <div className="px-5 py-3 flex items-center justify-between border-b border-app-border bg-surface-dark">
            <span className="text-xs text-[#555] font-medium tracking-[0.06em]">RECENT ACTIVITY</span>
            <button className="text-xs text-brand hover:underline">View all</button>
          </div>
          {activityFeed.map((item, i) => (
            <div
              key={item.id}
              className={`px-5 py-4 flex items-start gap-3 bg-surface ${
                i < activityFeed.length - 1 ? "border-b border-app-border" : ""
              }`}
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-neutral-800 border border-[#333]">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <circle cx="12" cy="8" r="3.5" stroke="#a3a3a3" strokeWidth="1.3" />
                  <path d="M4 20c0-4.418 3.582-7 8-7s8 2.582 8 7" stroke="#a3a3a3" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug text-neutral-400">
                  <span className="text-neutral-300 font-medium">{item.user}</span>{" "}
                  {item.action}{" "}
                  <span className="text-brand">{item.target}</span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={11} className="text-[#444]" />
                  <span className="text-xs text-[#444]">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right column: quick links */}
        <div className="space-y-4">
          {/* Branch health */}
          <div className="p-4 rounded-xl bg-surface border border-app-border">
            <p className="text-xs mb-3 text-[#555] font-medium tracking-[0.06em]">BRANCH HEALTH</p>
            {[
              { label: "API Response", value: "98ms", ok: true },
              { label: "Data Sync", value: "Healthy", ok: true },
              { label: "Integrations", value: "2 / 2 online", ok: true },
              { label: "Compliance Score", value: "84%", ok: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2 border-b border-[#222]"
              >
                <span className="text-xs text-neutral-500">{item.label}</span>
                <span className={`text-xs font-medium ${item.ok ? "text-brand" : "text-[#a37c52]"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
