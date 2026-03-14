import { Check, CreditCard, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

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
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold mb-1">{t("billing.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("billing.subtitle")}</p>
      </div>

      {/* Current plan banner */}
      <Card className="flex-row items-center justify-between p-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-brand/[13%] border border-brand/25">
            <Zap size={16} className="text-brand" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {t("billing.currentPlanBanner", { plan: "Free" })}
            </p>
            <p className="text-xs text-muted-foreground">{t("billing.nextBillingDate", { date: "N/A" })}</p>
          </div>
        </div>
        <Button>{t("billing.upgradePlan")}</Button>
      </Card>

      {/* Plans */}
      <h2 className="text-xs mb-3 text-subtle font-medium tracking-[0.07em]">{t("billing.plans")}</h2>
      <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-5 gap-4 ${plan.current ? "border-brand/[33%]" : ""}`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold">{plan.name}</p>
                {plan.current && (
                  <Badge>{t("billing.currentBadge")}</Badge>
                )}
              </div>
              <p className="text-xs mb-3 text-muted-foreground">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-bold">{plan.price}</span>
                <span className="text-xs text-subtle">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={13} className="mt-0.5 flex-shrink-0 text-brand" />
                  <span className="text-xs text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              {plan.current ? (
                <Button variant="outline" disabled className="w-full">
                  {t("billing.currentPlanButton")}
                </Button>
              ) : (
                <Button variant="solid" className="w-full">
                  {t("billing.upgradeTo", { name: plan.name })}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Payment method */}
      <h2 className="text-xs mb-3 text-subtle font-medium tracking-[0.07em]">{t("billing.paymentMethod")}</h2>
      <Card className="flex-row items-center justify-between p-4 mb-8">
        <div className="flex items-center gap-3 text-muted-foreground">
          <CreditCard size={16} />
          <span className="text-sm">{t("billing.noPaymentMethod")}</span>
        </div>
        <Button variant="outline" size="sm">
          {t("billing.addCard")}
        </Button>
      </Card>

      {/* Invoice history */}
      <h2 className="text-xs mb-3 text-subtle font-medium tracking-[0.07em]">{t("billing.invoiceHistory")}</h2>
      <Card className="overflow-hidden">
        <div
          className="grid px-4 py-3 bg-surface-dark border-b border-border"
          style={{ gridTemplateColumns: "1fr 160px 120px 100px" }}
        >
          {[t("billing.invoiceHeaders.invoice"), t("billing.invoiceHeaders.date"), t("billing.invoiceHeaders.amount"), t("billing.invoiceHeaders.status")].map((h) => (
            <span key={h} className="text-xs text-subtle font-medium tracking-[0.06em]">{h}</span>
          ))}
        </div>
        {invoices.map((inv, i) => (
          <div
            key={inv.id}
            className={`grid items-center px-4 py-3 ${
              i < invoices.length - 1 ? "border-b border-border" : ""
            }`}
            style={{ gridTemplateColumns: "1fr 160px 120px 100px" }}
          >
            <span className="text-sm text-secondary-foreground">{inv.id}</span>
            <span className="text-sm text-muted-foreground">{inv.date}</span>
            <span className="text-sm text-secondary-foreground">{inv.amount}</span>
            <Badge className="w-fit">
              <Check size={10} />
              {inv.status}
            </Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}
