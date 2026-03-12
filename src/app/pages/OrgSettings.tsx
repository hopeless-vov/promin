import { useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

export function OrgSettings() {
  const { orgId } = useParams();
  const { t } = useTranslation();
  const [orgName, setOrgName] = useState("Acme Corp");
  const [slug, setSlug] = useState(orgId || "");
  const [deleteConfirm, setDeleteConfirm] = useState("");

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-[22px] font-semibold mb-6">{t("settings.title")}</h1>

      {/* General section */}
      <section className="mb-8">
        <h2 className="text-xs mb-4 text-subtle font-medium tracking-[0.07em]">{t("settings.general")}</h2>
        <Card className="overflow-hidden">
          {/* Name */}
          <div className="p-5">
            <label className="block text-sm mb-1.5 text-secondary-foreground font-medium">
              {t("settings.orgName")}
            </label>
            <p className="text-xs mb-3 text-muted-foreground">
              {t("settings.orgNameDescription")}
            </p>
            <Input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>

          <Separator />

          {/* Slug */}
          <div className="p-5">
            <label className="block text-sm mb-1.5 text-secondary-foreground font-medium">
              {t("settings.orgSlug")}
            </label>
            <p className="text-xs mb-3 text-muted-foreground">
              {t("settings.orgSlugDescription")}
            </p>
            <div className="flex items-center rounded-lg overflow-hidden border border-border bg-card">
              <span className="px-3 py-2 text-sm flex-shrink-0 select-none border-r border-border bg-surface-dark text-subtle">
                org/
              </span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent px-3 py-2 text-secondary-foreground"
              />
            </div>
          </div>

          {/* Save footer */}
          <Separator />
          <div className="px-5 py-3 flex justify-end bg-surface-dark">
            <Button>{t("common.save")}</Button>
          </div>
        </Card>
      </section>

      {/* Danger zone */}
      <section>
        <h2 className="text-xs mb-4 text-subtle font-medium tracking-[0.07em]">{t("settings.dangerZone")}</h2>
        <Card className="overflow-hidden border-red-900/33">
          <div className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-red-400" />
              <div>
                <p className="text-sm text-secondary-foreground font-medium">{t("settings.deleteOrg")}</p>
                <p className="text-xs mt-1 leading-relaxed text-muted-foreground">
                  {t("settings.deleteOrgDescription")}
                </p>
              </div>
            </div>

            <label className="block text-xs mb-1.5 text-muted-foreground">
              {t("settings.deleteConfirmLabel", { word: "delete" })}
            </label>
            <Input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder={t("settings.deleteConfirmPlaceholder")}
              className="mb-3 border-red-900/33"
            />
            <Button
              variant={deleteConfirm === "delete" ? "destructive" : "outline"}
              disabled={deleteConfirm !== "delete"}
            >
              {t("settings.deleteButton")}
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
