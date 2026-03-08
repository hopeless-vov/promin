import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../AuthContext";

const inputCls =
  "w-full rounded-md text-sm bg-surface border border-app-border text-neutral-300 px-3 py-2 outline-none focus:border-brand transition-[border-color]";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signUp(email, password);
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
      <h1 className="text-white text-[28px] font-semibold leading-tight mb-1">Get started</h1>
      <p className="mb-8 text-neutral-400 text-sm">Create a new account</p>

      {error && (
        <div className="mb-4 px-3 py-2 rounded-lg text-sm bg-red-500/10 border border-red-500/30 text-red-400">
          {error}
        </div>
      )}

      {/* Gmail button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg mb-4 text-sm bg-surface border border-app-border text-neutral-300 transition-colors hover:bg-white/5"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Gmail
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-app-border" />
        <span className="text-sm text-[#555]">or</span>
        <div className="flex-1 h-px bg-app-border" />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1.5 text-sm text-neutral-300">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block mb-1.5 text-sm text-neutral-300">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputCls} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555]"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 px-4 rounded-lg text-sm font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Sign up"}
      </button>

      {/* Sign in link */}
      <p className="text-center mt-4 text-sm text-neutral-400">
        Have an account?{" "}
        <Link to="/dashboard/sign-in" className="underline text-neutral-300 hover:opacity-80 transition-opacity">
          Sign in
        </Link>
      </p>

      {/* Terms */}
      <p className="text-center mt-8 text-xs leading-relaxed text-[#555]">
        By continuing, you agree to our{" "}
        <a href="#" className="underline hover:opacity-80">Terms of Service</a>
        {" "}and{" "}
        <a href="#" className="underline hover:opacity-80">Privacy Policy</a>
        , and to receive periodic emails with updates.
      </p>
    </form>
  );
}
