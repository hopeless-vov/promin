import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  GitBranch,
  Globe,
  Pause,
  Play,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";

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
  const { t } = useTranslation();
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
        <Card className="w-full max-w-xl p-8">
          {/* Pause icon */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 border border-border bg-muted">
            <Pause size={20} className="text-muted-foreground" />
          </div>

          <h2 className="text-lg font-semibold mb-4">
            {t("branchOverview.pausedTitle", { name: branch.name })}
          </h2>

          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            {t("branchOverview.pausedDescription", { days: "87", deadline: branch.resumeDeadline })}
          </p>

          <p className="text-sm leading-relaxed mb-1 text-muted-foreground">
            {t("branchOverview.preventPauses")}
          </p>
          <p className="text-xs mb-8 text-subtle">{t("branchOverview.lastPaused", { date: branch.pausedDate })}</p>

          <Separator className="mb-6" />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-sm text-muted-foreground">
              <ExternalLink size={13} />
              {t("common.learnMore")}
            </button>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleResume}>
                {resuming ? (
                  <>
                    <div className="w-3 h-3 rounded-full border border-brand border-t-transparent animate-spin" />
                    {t("branchOverview.resuming")}
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    {t("branchOverview.resumeBranch")}
                  </>
                )}
              </Button>
              <Button variant="solid">
                {t("branchOverview.upgradeToPro")}
              </Button>
            </div>
          </div>
        </Card>
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
            <span className="text-xs text-brand font-medium">{t("branchOverview.active")}</span>
          </div>
          <h1 className="text-[22px] font-semibold">{branch.name}</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Globe size={12} className="text-subtle" />
            <span className="text-xs text-subtle">{branch.region}</span>
          </div>
        </div>
        <Button variant="outline">
          <AlertTriangle size={13} className="text-status-paused" />
          {t("branchOverview.pauseBranch")}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {statsActive.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon size={14} className="text-subtle" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-[22px] font-semibold mb-1">{stat.value}</p>
            <p className="text-xs text-subtle">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 340px" }}>
        {/* Activity feed */}
        <Card className="overflow-hidden">
          <div className="px-5 py-3 flex items-center justify-between border-b border-border bg-surface-dark">
            <span className="text-xs text-subtle font-medium tracking-[0.06em]">{t("branchOverview.recentActivity")}</span>
            <button className="text-xs text-brand hover:underline">{t("branchOverview.viewAll")}</button>
          </div>
          {activityFeed.map((item, i) => (
            <div
              key={item.id}
              className={`px-5 py-4 flex items-start gap-3 ${
                i < activityFeed.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-muted border border-border">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <circle cx="12" cy="8" r="3.5" stroke="#a3a3a3" strokeWidth="1.3" />
                  <path d="M4 20c0-4.418 3.582-7 8-7s8 2.582 8 7" stroke="#a3a3a3" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug text-muted-foreground">
                  <span className="text-secondary-foreground font-medium">{item.user}</span>{" "}
                  {item.action}{" "}
                  <span className="text-brand">{item.target}</span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={11} className="text-border" />
                  <span className="text-xs text-border">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Right column: quick links */}
        <div className="space-y-4">
          {/* Branch health */}
          <Card className="p-4">
            <p className="text-xs mb-3 text-subtle font-medium tracking-[0.06em]">{t("branchOverview.branchHealth")}</p>
            {[
              { label: "API Response", value: "98ms", ok: true },
              { label: "Data Sync", value: "Healthy", ok: true },
              { label: "Integrations", value: "2 / 2 online", ok: true },
              { label: "Compliance Score", value: "84%", ok: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
              >
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className={`text-xs font-medium ${item.ok ? "text-brand" : "text-status-paused"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
