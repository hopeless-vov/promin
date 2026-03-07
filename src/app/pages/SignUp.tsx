import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, Github } from "lucide-react";

const inputCls =
  "w-full rounded-md text-sm bg-surface border border-app-border text-neutral-300 px-3 py-2 outline-none focus:border-brand transition-[border-color]";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-white text-[28px] font-semibold leading-tight mb-1">Get started</h1>
      <p className="mb-8 text-neutral-400 text-sm">Create a new account</p>

      {/* GitHub button */}
      <button className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg mb-4 text-sm bg-surface border border-app-border text-neutral-300 transition-colors hover:bg-white/5">
        <Github size={16} />
        Continue with GitHub
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
      <button className="w-full py-2.5 px-4 rounded-lg text-sm font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90">
        Sign up
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
    </div>
  );
}
