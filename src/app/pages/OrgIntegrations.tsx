import { Puzzle, ExternalLink, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";

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
          <h1 className="text-[22px] font-semibold mb-1">Integrations</h1>
          <p className="text-sm text-muted-foreground">
            Connect external tools and services to enhance your workflow.
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="#">
            <ExternalLink size={13} />
            Browse catalogue
          </a>
        </Button>
      </div>

      {/* Connected section */}
      <div className="mb-8">
        <h2 className="text-xs mb-3 text-subtle font-medium tracking-[0.07em]">CONNECTED</h2>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {integrations.filter((i) => i.connected).map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      </div>

      {/* Available section */}
      <div>
        <h2 className="text-xs mb-3 text-subtle font-medium tracking-[0.07em]">AVAILABLE</h2>
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
    <Card className="p-4 gap-3">
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
            <p className="text-sm font-medium">{integration.name}</p>
            <Badge variant="secondary" className="text-xs mt-0.5">
              {integration.category}
            </Badge>
          </div>
        </div>

        {integration.connected && (
          <Badge>
            <Check size={11} />
            Connected
          </Badge>
        )}
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">{integration.description}</p>

      <div className="flex justify-end">
        {integration.connected ? (
          <Button variant="outline" size="sm">Configure</Button>
        ) : (
          <Button size="sm">Connect</Button>
        )}
      </div>
    </Card>
  );
}
