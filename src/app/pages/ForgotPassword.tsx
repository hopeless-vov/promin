import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { useAuth } from "@/app/AuthContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { t } = useTranslation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setError("");
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {sent ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-brand/[13%] border border-brand/[27%]">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#3ecf8e" strokeWidth="2">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-2">{t("auth.forgotPassword.successTitle")}</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              {t("auth.forgotPassword.successMessage")}{" "}
              <span className="text-secondary-foreground">{email}</span>
            </p>
            <Link
              to="/dashboard/sign-in"
              className="underline hover:opacity-80 transition-opacity text-sm text-secondary-foreground"
            >
              {t("auth.forgotPassword.backToSignIn")}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="text-[28px] font-semibold leading-tight mb-2">
              {t("auth.forgotPassword.title")}
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              {t("auth.forgotPassword.subtitle")}
            </p>

            {error && (
              <div className="mb-4 px-3 py-2 rounded-lg text-sm bg-destructive/10 border border-destructive/30 text-red-400">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-1.5 text-sm text-secondary-foreground">{t("auth.forgotPassword.emailLabel")}</label>
              <Input
                type="email"
                placeholder={t("auth.forgotPassword.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4 h-4" />

            <Button type="submit" disabled={loading} className="w-full py-2.5">
              {loading ? t("auth.forgotPassword.submitting") : t("auth.forgotPassword.submit")}
            </Button>

            <p className="text-center mt-4 text-sm text-muted-foreground">
              {t("auth.forgotPassword.hasAccount")}{" "}
              <Link
                to="/dashboard/sign-in"
                className="underline text-secondary-foreground hover:opacity-80 transition-opacity"
              >
                {t("auth.forgotPassword.signInLink")}
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
