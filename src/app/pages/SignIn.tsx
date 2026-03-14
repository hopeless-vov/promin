import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

import { useAuth } from "@/app/AuthContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard/organizations");
    }
  }

  async function handleGoogleSignIn() {
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <h1 className="text-[28px] font-semibold leading-tight mb-1">{t("auth.signIn.title")}</h1>
      <p className="mb-8 text-muted-foreground text-sm">{t("auth.signIn.subtitle")}</p>

      {error && (
        <div className="mb-4 px-3 py-2 rounded-lg text-sm bg-destructive/10 border border-destructive/30 text-red-400">
          {error}
        </div>
      )}

      {/* Gmail button */}
      <Button
        type="button"
        variant="secondary"
        onClick={handleGoogleSignIn}
        className="w-full justify-center gap-2.5 py-2.5 mb-4"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {t("auth.signIn.continueWithGmail")}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <Separator className="flex-1" />
        <span className="text-sm text-subtle">{t("common.or")}</span>
        <Separator className="flex-1" />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1.5 text-sm text-secondary-foreground">{t("auth.signIn.emailLabel")}</label>
        <Input
          type="email"
          placeholder={t("auth.signIn.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm text-secondary-foreground">{t("auth.signIn.passwordLabel")}</label>
          <Link
            to="/dashboard/forgot-password"
            className="text-sm text-muted-foreground hover:opacity-80 transition-opacity"
          >
            {t("auth.signIn.forgotPassword")}
          </Link>
        </div>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={t("auth.signIn.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading} className="w-full py-2.5">
        {loading ? t("auth.signIn.submitting") : t("auth.signIn.submit")}
      </Button>

      {/* Sign up link */}
      <p className="text-center mt-4 text-sm text-muted-foreground">
        {t("auth.signIn.noAccount")}{" "}
        <Link to="/dashboard/sign-up" className="underline text-secondary-foreground hover:opacity-80 transition-opacity">
          {t("auth.signIn.signUpLink")}
        </Link>
      </p>

      {/* Terms */}
      <p className="text-center mt-8 text-xs leading-relaxed text-subtle">
        {t("auth.terms")}{" "}
        <a href="#" className="underline hover:opacity-80">{t("auth.termsOfService")}</a>
        {" "}{t("auth.and")}{" "}
        <a href="#" className="underline hover:opacity-80">{t("auth.privacyPolicy")}</a>
        {t("auth.termsEmails")}
      </p>
    </form>
  );
}
