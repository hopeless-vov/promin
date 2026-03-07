import { CreditCard, Check, Zap } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/month",
    description: "For small teams getting started.",
    current: true,
    features: [
      "Up to 5 team members",
      "10 branches",
      "500K API requests / month",
      "8 GB storage",
      "Community support",
    ],
  },
  {
    id: "team",
    name: "Team",
    price: "$25",
    period: "/month per member",
    description: "For growing teams with advanced needs.",
    current: false,
    features: [
      "Unlimited team members",
      "Unlimited branches",
      "5M API requests / month",
      "100 GB storage",
      "Priority support",
      "SSO & advanced security",
      "Custom integrations",
    ],
  },
];

const invoices = [
  { id: "INV-2026-002", date: "Feb 1, 2026", amount: "$0.00", status: "Paid" },
  { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$0.00", status: "Paid" },
  { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$0.00", status: "Paid" },
];

export function OrgBilling() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-white text-[22px] font-semibold mb-1">Billing</h1>
        <p className="text-sm text-neutral-400">Manage your subscription plan and payment details.</p>
      </div>

      {/* Current plan banner */}
      <div className="flex items-center justify-between p-4 rounded-xl mb-8 bg-surface border border-app-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-brand/[13%] border border-brand/25">
            <Zap size={16} className="text-brand" />
          </div>
          <div>
            <p className="text-sm text-white font-medium">
              You're on the <span className="text-brand">Free</span> plan
            </p>
            <p className="text-xs text-neutral-500">Next billing date: N/A</p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90">
          Upgrade plan
        </button>
      </div>

      {/* Plans */}
      <h2 className="text-xs mb-3 text-[#555] font-medium tracking-[0.07em]">PLANS</h2>
      <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-5 rounded-xl flex flex-col gap-4 bg-surface ${
              plan.current ? "border border-brand/[33%]" : "border border-app-border"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-white font-semibold">{plan.name}</p>
                {plan.current && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brand/[13%] border border-brand/25 text-brand font-medium">
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs mb-3 text-neutral-500">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-white text-[28px] font-bold">{plan.price}</span>
                <span className="text-xs text-[#555]">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={13} className="mt-0.5 flex-shrink-0 text-brand" />
                  <span className="text-xs text-neutral-400">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              {plan.current ? (
                <button
                  disabled
                  className="w-full py-2 rounded-lg text-sm cursor-not-allowed border border-app-border text-[#555]"
                >
                  Current plan
                </button>
              ) : (
                <button className="w-full py-2 rounded-lg text-sm font-semibold bg-brand text-neutral-950 transition-opacity hover:opacity-90">
                  Upgrade to {plan.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment method */}
      <h2 className="text-xs mb-3 text-[#555] font-medium tracking-[0.07em]">PAYMENT METHOD</h2>
      <div className="flex items-center justify-between p-4 rounded-xl mb-8 bg-surface border border-app-border">
        <div className="flex items-center gap-3 text-neutral-500">
          <CreditCard size={16} />
          <span className="text-sm">No payment method on file</span>
        </div>
        <button className="px-3 py-1.5 rounded text-xs border border-app-border text-neutral-400 transition-colors hover:bg-white/5">
          Add card
        </button>
      </div>

      {/* Invoice history */}
      <h2 className="text-xs mb-3 text-[#555] font-medium tracking-[0.07em]">INVOICE HISTORY</h2>
      <div className="rounded-xl overflow-hidden border border-app-border">
        <div
          className="grid px-4 py-3 bg-surface-dark border-b border-app-border"
          style={{ gridTemplateColumns: "1fr 160px 120px 100px" }}
        >
          {["INVOICE", "DATE", "AMOUNT", "STATUS"].map((h) => (
            <span key={h} className="text-xs text-[#555] font-medium tracking-[0.06em]">{h}</span>
          ))}
        </div>
        {invoices.map((inv, i) => (
          <div
            key={inv.id}
            className={`grid items-center px-4 py-3 bg-surface ${
              i < invoices.length - 1 ? "border-b border-app-border" : ""
            }`}
            style={{ gridTemplateColumns: "1fr 160px 120px 100px" }}
          >
            <span className="text-sm text-neutral-300">{inv.id}</span>
            <span className="text-sm text-neutral-500">{inv.date}</span>
            <span className="text-sm text-neutral-300">{inv.amount}</span>
            <span className="text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 w-fit bg-brand/[8%] border border-brand/[19%] text-brand">
              <Check size={10} />
              {inv.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
