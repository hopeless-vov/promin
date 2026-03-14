import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Card } from "./ui/card";

export interface Org {
  id: string;
  name: string;
  type: string;
}

function OrgIcon() {
  return (
    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-muted border border-border">
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="8" r="3.5" stroke="#a3a3a3" strokeWidth="1.3" />
        <path
          d="M4 20c0-4.418 3.582-7 8-7s8 2.582 8 7"
          stroke="#a3a3a3"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="19" cy="14" r="2" stroke="#a3a3a3" strokeWidth="1.1" />
        <circle cx="5" cy="14" r="2" stroke="#a3a3a3" strokeWidth="1.1" />
      </svg>
    </div>
  );
}

export function OrganizationCard({ org }: { org: Org }) {
  const { t } = useTranslation();
  return (
    <Card className="hover:bg-white/5 transition-colors">
      <Link
        to={`/dashboard/org/${org.id}`}
        className="flex items-center gap-3 p-4"
      >
        <OrgIcon />
        <div>
          <p className="text-sm font-medium">{org.name}</p>
          <p className="text-xs mt-0.5 flex items-center gap-1.5 text-muted-foreground">
            {t("organizations.freePlan")}
            <span className="text-border">•</span>
            {org.type}
          </p>
        </div>
      </Link>
    </Card>
  );
}
