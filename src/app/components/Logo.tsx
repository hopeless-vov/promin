import { Link } from "react-router";

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const iconSize = size === "sm" ? "w-6 h-6" : "w-8 h-8";
  const textSize = size === "sm" ? "text-base" : "text-lg";

  return (
    <Link to="/dashboard/organizations" className="flex items-center gap-2 group">
      <div className={`${iconSize} relative flex-shrink-0`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M6 24L16 6L26 24H6Z" fill="#3ecf8e" />
          <path d="M6 24L16 14L26 24H6Z" fill="#3ecf8e" opacity="0.5" />
        </svg>
      </div>
      <span className={`${textSize} text-white`} style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
        SRM
      </span>
    </Link>
  );
}
