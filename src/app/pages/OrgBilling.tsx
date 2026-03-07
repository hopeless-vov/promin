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
        <h1 className="text-white mb-1" style={{ fontSize: "22px", fontWeight: 600 }}>
          Billing
        </h1>
        <p className="text-sm" style={{ color: "#a3a3a3" }}>
          Manage your subscription plan and payment details.
        </p>
      </div>

      {/* Current plan banner */}
      <div
        className="flex items-center justify-between p-4 rounded-xl mb-8"
        style={{ backgroundColor: "#1e1e1e", border: "1px solid #2e2e2e" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#3ecf8e20", border: "1px solid #3ecf8e40" }}
          >
            <Zap size={16} style={{ color: "#3ecf8e" }} />
          </div>
          <div>
            <p className="text-sm text-white" style={{ fontWeight: 500 }}>
              You're on the <span style={{ color: "#3ecf8e" }}>Free</span> plan
            </p>
            <p className="text-xs" style={{ color: "#737373" }}>
              Next billing date: N/A
            </p>
          </div>
        </div>
        <button
          className="px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "#3ecf8e22",
            border: "1px solid #3ecf8e55",
            color: "#3ecf8e",
            fontWeight: 500,
          }}
        >
          Upgrade plan
        </button>
      </div>

      {/* Plans */}
      <h2 className="text-xs mb-3" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.07em" }}>
        PLANS
      </h2>
      <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-5 rounded-xl flex flex-col gap-4"
            style={{
              backgroundColor: "#1e1e1e",
              border: plan.current ? "1px solid #3ecf8e55" : "1px solid #2e2e2e",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-white" style={{ fontWeight: 600 }}>
                  {plan.name}
                </p>
                {plan.current && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "#3ecf8e20",
                      border: "1px solid #3ecf8e40",
                      color: "#3ecf8e",
                      fontWeight: 500,
                    }}
                  >
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs mb-3" style={{ color: "#737373" }}>
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-white" style={{ fontSize: "28px", fontWeight: 700 }}>
                  {plan.price}
                </span>
                <span className="text-xs" style={{ color: "#555" }}>
                  {plan.period}
                </span>
              </div>
            </div>

            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: "#3ecf8e" }} />
                  <span className="text-xs" style={{ color: "#a3a3a3" }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              {plan.current ? (
                <button
                  disabled
                  className="w-full py-2 rounded-lg text-sm cursor-not-allowed"
                  style={{ border: "1px solid #2e2e2e", color: "#555" }}
                >
                  Current plan
                </button>
              ) : (
                <button
                  className="w-full py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: "#3ecf8e",
                    color: "#0a0a0a",
                    fontWeight: 600,
                  }}
                >
                  Upgrade to {plan.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment method */}
      <h2 className="text-xs mb-3" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.07em" }}>
        PAYMENT METHOD
      </h2>
      <div
        className="flex items-center justify-between p-4 rounded-xl mb-8"
        style={{ backgroundColor: "#1e1e1e", border: "1px solid #2e2e2e" }}
      >
        <div className="flex items-center gap-3" style={{ color: "#737373" }}>
          <CreditCard size={16} />
          <span className="text-sm">No payment method on file</span>
        </div>
        <button
          className="px-3 py-1.5 rounded text-xs transition-colors hover:bg-white/5"
          style={{ border: "1px solid #2e2e2e", color: "#a3a3a3" }}
        >
          Add card
        </button>
      </div>

      {/* Invoice history */}
      <h2 className="text-xs mb-3" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.07em" }}>
        INVOICE HISTORY
      </h2>
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #2e2e2e" }}>
        <div
          className="grid px-4 py-3"
          style={{
            gridTemplateColumns: "1fr 160px 120px 100px",
            backgroundColor: "#1a1a1a",
            borderBottom: "1px solid #2e2e2e",
          }}
        >
          {["INVOICE", "DATE", "AMOUNT", "STATUS"].map((h) => (
            <span key={h} className="text-xs" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.06em" }}>
              {h}
            </span>
          ))}
        </div>
        {invoices.map((inv, i) => (
          <div
            key={inv.id}
            className="grid items-center px-4 py-3"
            style={{
              gridTemplateColumns: "1fr 160px 120px 100px",
              backgroundColor: "#1e1e1e",
              borderBottom: i < invoices.length - 1 ? "1px solid #2e2e2e" : "none",
            }}
          >
            <span className="text-sm" style={{ color: "#d4d4d4" }}>
              {inv.id}
            </span>
            <span className="text-sm" style={{ color: "#737373" }}>
              {inv.date}
            </span>
            <span className="text-sm" style={{ color: "#d4d4d4" }}>
              {inv.amount}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 w-fit"
              style={{
                backgroundColor: "#3ecf8e15",
                border: "1px solid #3ecf8e30",
                color: "#3ecf8e",
              }}
            >
              <Check size={10} />
              {inv.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
