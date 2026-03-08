import { Link } from "react-router";

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const iconSize = size === "sm" ? "w-6 h-6" : "w-8 h-8";
  const textSize = size === "sm" ? "text-base" : "text-lg";

  return (
    <Link to="/dashboard/organizations" className="flex items-center gap-2 group">
      <div className={`${iconSize} relative flex-shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer 8-pointed star shape */}
          <path
            d="M 50,5
                L 58.42,29.67
                L 81.82,18.18
                L 70.33,41.58
                L 95,50
                L 70.33,58.42
                L 81.82,81.82
                L 58.42,70.33
                L 50,95
                L 41.58,70.33
                L 18.18,81.82
                L 29.67,58.42
                L 5,50
                L 29.67,41.58
                L 18.18,18.18
                L 41.58,29.67
                Z"
            stroke="#4ade80"
            strokeWidth="5.5"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Inner circle ring */}
          <circle
            cx="50"
            cy="50"
            r="16"
            stroke="#4ade80"
            strokeWidth="5.5"
            fill="none"
          />
        </svg>
      </div>
      <span className={`${textSize} text-white`} style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
        SRM
      </span>
    </Link>
  );
}
