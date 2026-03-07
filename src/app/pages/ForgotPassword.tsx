import { useState } from "react";
import { Link } from "react-router";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const inputStyle = {
    backgroundColor: "#1e1e1e",
    border: "1px solid #2e2e2e",
    color: "#d4d4d4",
    borderRadius: "6px",
    padding: "10px 14px",
    width: "100%",
    outline: "none",
    fontSize: "14px",
  };

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {sent ? (
          <div className="text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#3ecf8e22", border: "1px solid #3ecf8e44" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#3ecf8e" strokeWidth="2">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <h1 className="text-white mb-2" style={{ fontSize: "24px", fontWeight: 600 }}>
              Check your inbox
            </h1>
            <p className="mb-6" style={{ color: "#a3a3a3", fontSize: "14px" }}>
              We've sent a password reset code to{" "}
              <span style={{ color: "#d4d4d4" }}>{email}</span>
            </p>
            <Link
              to="/dashboard/sign-in"
              className="underline hover:opacity-80 transition-opacity text-sm"
              style={{ color: "#d4d4d4" }}
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-white mb-2" style={{ fontSize: "28px", fontWeight: 600, lineHeight: 1.2 }}>
              Forgot your password?
            </h1>
            <p className="mb-8" style={{ color: "#a3a3a3", fontSize: "14px", lineHeight: 1.5 }}>
              Enter your email and we'll send you a code to reset the password
            </p>

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

            <div className="mb-4 h-4" />

            <button
              onClick={() => email && setSent(true)}
              className="w-full py-2.5 px-4 rounded-lg text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#3ecf8e22", border: "1px solid #3ecf8e55", color: "#3ecf8e", fontWeight: 500 }}
            >
              Send reset code
            </button>

            <p className="text-center mt-4 text-sm" style={{ color: "#a3a3a3" }}>
              Already have an account?{" "}
              <Link
                to="/dashboard/sign-in"
                className="underline hover:opacity-80 transition-opacity"
                style={{ color: "#d4d4d4" }}
              >
                Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
