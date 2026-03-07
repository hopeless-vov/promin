import { useState } from "react";
import { Link } from "react-router";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

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
            <h1 className="text-white text-2xl font-semibold mb-2">Check your inbox</h1>
            <p className="mb-6 text-sm text-neutral-400">
              We've sent a password reset code to{" "}
              <span className="text-neutral-300">{email}</span>
            </p>
            <Link
              to="/dashboard/sign-in"
              className="underline hover:opacity-80 transition-opacity text-sm text-neutral-300"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-white text-[28px] font-semibold leading-tight mb-2">
              Forgot your password?
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-neutral-400">
              Enter your email and we'll send you a code to reset the password
            </p>

            <div className="mb-4">
              <label className="block mb-1.5 text-sm text-neutral-300">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md text-sm bg-surface border border-app-border text-neutral-300 px-3 py-2.5 outline-none focus:border-brand transition-[border-color]"
              />
            </div>

            <div className="mb-4 h-4" />

            <button
              onClick={() => email && setSent(true)}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90"
            >
              Send reset code
            </button>

            <p className="text-center mt-4 text-sm text-neutral-400">
              Already have an account?{" "}
              <Link
                to="/dashboard/sign-in"
                className="underline text-neutral-300 hover:opacity-80 transition-opacity"
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
