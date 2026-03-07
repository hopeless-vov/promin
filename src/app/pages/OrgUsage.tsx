import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const apiData = [
  { day: "Mar 1", requests: 12400 },
  { day: "Mar 2", requests: 9800 },
  { day: "Mar 3", requests: 15200 },
  { day: "Mar 4", requests: 11600 },
  { day: "Mar 5", requests: 17800 },
  { day: "Mar 6", requests: 14300 },
  { day: "Mar 7", requests: 19500 },
  { day: "Mar 8", requests: 16200 },
  { day: "Mar 9", requests: 21000 },
  { day: "Mar 10", requests: 18400 },
  { day: "Mar 11", requests: 22700 },
  { day: "Mar 12", requests: 20100 },
];

const storageData = [
  { day: "Mar 1", gb: 2.1 },
  { day: "Mar 2", gb: 2.3 },
  { day: "Mar 3", gb: 2.4 },
  { day: "Mar 4", gb: 2.4 },
  { day: "Mar 5", gb: 2.7 },
  { day: "Mar 6", gb: 2.9 },
  { day: "Mar 7", gb: 3.0 },
  { day: "Mar 8", gb: 3.1 },
  { day: "Mar 9", gb: 3.4 },
  { day: "Mar 10", gb: 3.5 },
  { day: "Mar 11", gb: 3.6 },
  { day: "Mar 12", gb: 3.8 },
];

const stats = [
  { label: "API Requests", value: "182,700", limit: "500,000", pct: 37 },
  { label: "Storage", value: "3.8 GB", limit: "8 GB", pct: 48 },
  { label: "Team Members", value: "3", limit: "5", pct: 60 },
  { label: "Branches", value: "4", limit: "10", pct: 40 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-lg text-xs bg-surface border border-app-border text-neutral-300">
      <p className="text-neutral-500">{label}</p>
      <p className="mt-0.5 text-brand font-semibold">{payload[0].value?.toLocaleString()}</p>
    </div>
  );
}

export function OrgUsage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-white text-[22px] font-semibold mb-1">Usage</h1>
        <p className="text-sm text-neutral-400">
          Monitor your organization's resource consumption this billing cycle.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {stats.map((s) => (
          <div key={s.label} className="p-4 rounded-xl bg-surface border border-app-border">
            <p className="text-xs mb-2 text-neutral-500">{s.label}</p>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-white text-[20px] font-semibold">{s.value}</span>
              <span className="text-xs text-[#555]">/ {s.limit}</span>
            </div>
            {/* Progress bar */}
            <div className="h-1 rounded-full overflow-hidden bg-app-border">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${s.pct}%`,
                  backgroundColor: s.pct > 80 ? "#f87171" : "#3ecf8e",
                }}
              />
            </div>
            <p className="text-xs mt-1.5 text-[#555]">{s.pct}% used</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <ChartCard title="API Requests" subtitle="Last 12 days" data={apiData} dataKey="requests" unit="" />
        <ChartCard title="Storage" subtitle="Last 12 days" data={storageData} dataKey="gb" unit=" GB" />
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  data,
  dataKey,
  unit,
}: {
  title: string;
  subtitle: string;
  data: any[];
  dataKey: string;
  unit: string;
}) {
  return (
    <div className="p-5 rounded-xl bg-surface border border-app-border">
      <div className="mb-4">
        <p className="text-sm text-white font-medium">{title}</p>
        <p className="text-xs text-[#555]">{subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3ecf8e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3ecf8e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 10, fill: "#555" }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis tick={{ fontSize: 10, fill: "#555" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#3ecf8e"
            strokeWidth={1.5}
            fill={`url(#grad-${dataKey})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
