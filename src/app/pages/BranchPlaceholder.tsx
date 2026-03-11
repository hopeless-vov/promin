import { useLocation } from "react-router";
import {
  Table2,
  Search,
  Database,
  ShieldCheck,
  FolderOpen,
  Zap,
  Activity,
  Lightbulb,
  BarChart2,
  ScrollText,
  Puzzle,
  Settings,
} from "lucide-react";

const pageMap: Record<
  string,
  { icon: React.ElementType; label: string; description: string }
> = {
  suppliers: {
    icon: Table2,
    label: "Supplier Data",
    description: "View and manage your supplier records, profiles, and performance metrics.",
  },
  query: {
    icon: Search,
    label: "Query Builder",
    description: "Build custom queries to filter and explore your supplier database.",
  },
  contacts: {
    icon: Database,
    label: "Contacts",
    description: "Manage contacts associated with your suppliers and partners.",
  },
  access: {
    icon: ShieldCheck,
    label: "Access Control",
    description: "Configure roles and permissions for team members within this branch.",
  },
  documents: {
    icon: FolderOpen,
    label: "Documents",
    description: "Store and manage contracts, certificates, and compliance documents.",
  },
  automations: {
    icon: Zap,
    label: "Automations",
    description: "Set up automated workflows to streamline supplier onboarding and reviews.",
  },
  activity: {
    icon: Activity,
    label: "Activity Feed",
    description: "Track all actions and changes made within this branch.",
  },
  insights: {
    icon: Lightbulb,
    label: "Insights",
    description: "AI-powered recommendations and supplier risk signals.",
  },
  analytics: {
    icon: BarChart2,
    label: "Analytics",
    description: "Visualise supplier performance trends and KPIs over time.",
  },
  logs: {
    icon: ScrollText,
    label: "Logs",
    description: "Detailed audit logs for all system and user events in this branch.",
  },
  integrations: {
    icon: Puzzle,
    label: "Integrations",
    description: "Connect external tools and data sources to this branch.",
  },
  settings: {
    icon: Settings,
    label: "Branch Settings",
    description: "Configure branch-level preferences, environments, and danger zone actions.",
  },
};

export function BranchPlaceholder() {
  const location = useLocation();
  const segment = location.pathname.split("/").pop() || "";
  const page = pageMap[segment] || {
    icon: Settings,
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    description: "This page is under construction.",
  };
  const Icon = page.icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)] p-16 text-center">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-card border border-border">
        <Icon size={20} className="text-brand" />
      </div>
      <h2 className="text-lg font-semibold mb-2">{page.label}</h2>
      <p className="text-sm max-w-xs leading-relaxed text-muted-foreground">{page.description}</p>
      <span className="mt-6 text-xs px-3 py-1.5 rounded-full bg-card border border-border text-subtle">
        Coming soon
      </span>
    </div>
  );
}
