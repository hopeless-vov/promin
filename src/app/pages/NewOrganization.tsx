import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { TopNav } from "@/app/components/TopNav";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";
import { useCreateOrganization } from "@/hooks/useOrganizations";

export function NewOrganization() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [orgType, setOrgType] = useState("Personal");
  const [plan, setPlan] = useState("Free - $0/month");
  const createOrg = useCreateOrganization();
  const [error, setError] = useState("");

  return (
    <div>
      <TopNav variant="plain" title={t("newOrg.pageTitle")} />

      <div className="flex items-start justify-center px-6 py-12">
        <Card className="w-full max-w-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5">
            <h2 className="text-base font-semibold mb-1">{t("newOrg.title")}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("newOrg.description")}
            </p>
          </div>

          <Separator />

          {/* Name field */}
          <div className="px-6 py-5 grid grid-cols-3 gap-6 items-start">
            <div>
              <label className="text-sm font-medium text-secondary-foreground">{t("newOrg.nameLabel")}</label>
            </div>
            <div className="col-span-2">
              <Input
                placeholder={t("newOrg.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-xs mt-2 text-subtle">
                {t("newOrg.nameHint")}
              </p>
            </div>
          </div>

          <Separator />

          {/* Type field */}
          <div className="px-6 py-5 grid grid-cols-3 gap-6 items-start">
            <div>
              <label className="text-sm font-medium text-secondary-foreground">{t("newOrg.typeLabel")}</label>
            </div>
            <div className="col-span-2">
              <div className="relative">
                <select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value)}
                  className="w-full appearance-none rounded-md text-sm bg-card border border-border text-secondary-foreground pl-3 pr-9 py-2.5 outline-none focus:border-ring transition-[border-color] cursor-pointer"
                >
                  <option>{t("newOrg.typeOptions.personal")}</option>
                  <option>{t("newOrg.typeOptions.company")}</option>
                  <option>{t("newOrg.typeOptions.agency")}</option>
                  <option>{t("newOrg.typeOptions.nonProfit")}</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-subtle"
                />
              </div>
              <p className="text-xs mt-2 text-subtle">{t("newOrg.typeHint")}</p>
            </div>
          </div>

          <Separator />

          {/* Plan field */}
          <div className="px-6 py-5 grid grid-cols-3 gap-6 items-start">
            <div>
              <label className="text-sm font-medium text-secondary-foreground">{t("newOrg.planLabel")}</label>
            </div>
            <div className="col-span-2">
              <div className="relative">
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full appearance-none rounded-md text-sm bg-card border border-border text-secondary-foreground pl-3 pr-9 py-2.5 outline-none focus:border-ring transition-[border-color] cursor-pointer"
                >
                  <option>{t("newOrg.planOptions.free")}</option>
                  <option>{t("newOrg.planOptions.pro")}</option>
                  <option>{t("newOrg.planOptions.team")}</option>
                  <option>{t("newOrg.planOptions.enterprise")}</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-subtle"
                />
              </div>
              <p className="text-xs mt-2 text-subtle">
                {t("newOrg.planHint")}{" "}
                <a href="#" className="underline hover:opacity-80 text-muted-foreground">
                  {t("common.learnMore")}
                </a>
                .
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <>
              <Separator />
              <div className="px-6 py-3 text-sm text-red-400">
                {error}
              </div>
            </>
          )}

          {/* Footer */}
          <Separator />
          <div className="px-6 py-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/organizations")}
            >
              {t("common.cancel")}
            </Button>
            <Button
              disabled={createOrg.isPending || !name.trim()}
              onClick={async () => {
                setError("");
                try {
                  const org = await createOrg.mutateAsync({ name: name.trim(), type: orgType });
                  navigate(`/dashboard/org/${org.id}`);
                } catch (e: unknown) {
                  setError(e instanceof Error ? e.message : t("newOrg.error"));
                }
              }}
            >
              {createOrg.isPending ? t("newOrg.submitting") : t("newOrg.submit")}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}