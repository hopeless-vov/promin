import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, Github } from "lucide-react";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputStyle = {
    backgroundColor: "#1e1e1e",
    border: "1px solid #2e2e2e",
    color: "#d4d4d4",
    borderRadius: "6px",
    padding: "8px 12px",
    width: "100%",
    outline: "none",
    fontSize: "14px",
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-white mb-1" style={{ fontSize: "28px", fontWeight: 600, lineHeight: 1.2 }}>
        Get started
      </h1>
      <p className="mb-8" style={{ color: "#a3a3a3", fontSize: "14px" }}>
        Create a new account
      </p>

      {/* GitHub button */}
      <button
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg mb-4 text-sm transition-colors hover:bg-white/5"
        style={{
          backgroundColor: "#1e1e1e",
          border: "1px solid #2e2e2e",
          color: "#d4d4d4",
        }}
      >
        <Github size={16} />
        Continue with GitHub
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px" style={{ backgroundColor: "#2e2e2e" }} />
        <span className="text-sm" style={{ color: "#555" }}>
          or
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "#2e2e2e" }} />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1.5 text-sm" style={{ color: "#d4d4d4" }}>
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#3ecf8e")}
          onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block mb-1.5 text-sm" style={{ color: "#d4d4d4" }}>
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, paddingRight: "40px" }}
            onFocus={(e) => (e.target.style.borderColor = "#3ecf8e")}
            onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "#555" }}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        className="w-full py-2.5 px-4 rounded-lg text-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#3ecf8e22", border: "1px solid #3ecf8e55", color: "#3ecf8e", fontWeight: 500 }}
      >
        Sign up
      </button>

      {/* Sign in link */}
      <p className="text-center mt-4 text-sm" style={{ color: "#a3a3a3" }}>
        Have an account?{" "}
        <Link
          to="/dashboard/sign-in"
          className="underline hover:opacity-80 transition-opacity"
          style={{ color: "#d4d4d4" }}
        >
          Sign in
        </Link>
      </p>

      {/* Terms */}
      <p className="text-center mt-8 text-xs leading-relaxed" style={{ color: "#555" }}>
        By continuing, you agree to our{" "}
        <a href="#" className="underline hover:opacity-80">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:opacity-80">
          Privacy Policy
        </a>
        , and to receive periodic emails with updates.
      </p>
    </div>
  );
}
