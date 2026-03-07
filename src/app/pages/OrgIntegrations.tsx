import { Puzzle, ExternalLink, Check } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  logo: string;
}

const integrations: Integration[] = [
  { id: "slack", name: "Slack", description: "Receive real-time alerts and notifications directly in your Slack channels.", category: "Communication", connected: true, logo: "SL" },
  { id: "github", name: "GitHub", description: "Link repositories to branches and automate deployment workflows.", category: "Development", connected: true, logo: "GH" },
  { id: "zapier", name: "Zapier", description: "Connect with thousands of apps and automate repetitive tasks.", category: "Automation", connected: false, logo: "ZP" },
  { id: "jira", name: "Jira", description: "Sync issues and track supplier-related tasks across your team.", category: "Project Management", connected: false, logo: "JR" },
  { id: "hubspot", name: "HubSpot", description: "Bring supplier contacts and deal data into your CRM pipeline.", category: "CRM", connected: false, logo: "HS" },
  { id: "datadog", name: "Datadog", description: "Monitor performance metrics and activity logs across all branches.", category: "Monitoring", connected: false, logo: "DD" },
];

const logoColors: Record<string, string> = {
  SL: "#611f69",
  GH: "#24292e",
  ZP: "#ff4a00",
  JR: "#0052cc",
  HS: "#ff7a59",
  DD: "#632ca6",
};

export function OrgIntegrations() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-white text-[22px] font-semibold mb-1">Integrations</h1>
          <p className="text-sm text-neutral-400">
            Connect external tools and services to enhance your workflow.
          </p>
        </div>
        <a
          href="#"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border border-app-border text-neutral-400 transition-colors hover:bg-white/5"
        >
          <ExternalLink size={13} />
          Browse catalogue
        </a>
      </div>

      {/* Connected section */}
      <div className="mb-8">
        <h2 className="text-xs mb-3 text-[#555] font-medium tracking-[0.07em]">CONNECTED</h2>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {integrations.filter((i) => i.connected).map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      </div>

      {/* Available section */}
      <div>
        <h2 className="text-xs mb-3 text-[#555] font-medium tracking-[0.07em]">AVAILABLE</h2>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {integrations.filter((i) => !i.connected).map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({ integration }: { integration: Integration }) {
  const bgColor = logoColors[integration.logo] || "#333";

  return (
    <div className="p-4 rounded-xl flex flex-col gap-3 bg-surface border border-app-border">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: bgColor }}
          >
            <span className="text-white text-[11px] font-bold">{integration.logo}</span>
          </div>
          <div>
            <p className="text-sm text-white font-medium">{integration.name}</p>
            <span className="text-xs px-1.5 py-0.5 rounded bg-[#2a2a2a] text-neutral-500 border border-[#333]">
              {integration.category}
            </span>
          </div>
        </div>

        {integration.connected && (
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-brand/[8%] border border-brand/[19%]">
            <Check size={11} className="text-brand" />
            <span className="text-xs text-brand font-medium">Connected</span>
          </div>
        )}
      </div>

      <p className="text-xs leading-relaxed text-neutral-500">{integration.description}</p>

      <div className="flex justify-end">
        {integration.connected ? (
          <button className="px-3 py-1.5 rounded text-xs border border-app-border text-neutral-400 transition-colors hover:bg-white/5">
            Configure
          </button>
        ) : (
          <button className="px-3 py-1.5 rounded text-xs font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90">
            Connect
          </button>
        )}
      </div>
    </div>
  );
}
