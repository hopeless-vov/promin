import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../components/TopNav";
import { ChevronDown } from "lucide-react";

export function NewOrganization() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [orgType, setOrgType] = useState("Personal");
  const [plan, setPlan] = useState("Free - $0/month");

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

  const selectStyle = {
    backgroundColor: "#1e1e1e",
    border: "1px solid #2e2e2e",
    color: "#d4d4d4",
    borderRadius: "6px",
    padding: "9px 36px 9px 12px",
    width: "100%",
    outline: "none",
    fontSize: "14px",
    appearance: "none" as const,
    cursor: "pointer",
  };

  return (
    <div style={{ color: "#fff" }}>
      <TopNav variant="plain" title="New organization" />

      <div className="flex items-start justify-center px-6 py-12">
        <div
          className="w-full max-w-2xl rounded-xl overflow-hidden"
          style={{
            backgroundColor: "#1e1e1e",
            border: "1px solid #2e2e2e",
          }}
        >
          {/* Header */}
          <div className="px-6 py-5" style={{ borderBottom: "1px solid #2e2e2e" }}>
            <h2 className="text-white mb-1" style={{ fontSize: "16px", fontWeight: 600 }}>
              Create a new organization
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#a3a3a3" }}>
              Organizations are a way to group your branches together. Each organization can be
              configured with different team members and billing settings.
            </p>
          </div>

          {/* Name field */}
          <div
            className="px-6 py-5 grid grid-cols-3 gap-6 items-start"
            style={{ borderBottom: "1px solid #2e2e2e" }}
          >
            <div>
              <label className="text-sm" style={{ color: "#d4d4d4", fontWeight: 500 }}>
                Name
              </label>
            </div>
            <div className="col-span-2">
              <input
                placeholder="Organization name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#3ecf8e")}
                onBlur={(e) => (e.target.style.borderColor = "#2e2e2e")}
              />
              <p className="text-xs mt-2" style={{ color: "#555" }}>
                What's the name of your company or team? You can change this later.
              </p>
            </div>
          </div>

          {/* Type field */}
          <div
            className="px-6 py-5 grid grid-cols-3 gap-6 items-start"
            style={{ borderBottom: "1px solid #2e2e2e" }}
          >
            <div>
              <label className="text-sm" style={{ color: "#d4d4d4", fontWeight: 500 }}>
                Type
              </label>
            </div>
            <div className="col-span-2">
              <div className="relative">
                <select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value)}
                  style={selectStyle}
                >
                  <option>Personal</option>
                  <option>Company</option>
                  <option>Agency</option>
                  <option>Non-profit</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#555" }}
                />
              </div>
              <p className="text-xs mt-2" style={{ color: "#555" }}>
                What best describes your organization?
              </p>
            </div>
          </div>

          {/* Plan field */}
          <div className="px-6 py-5 grid grid-cols-3 gap-6 items-start">
            <div>
              <label className="text-sm" style={{ color: "#d4d4d4", fontWeight: 500 }}>
                Plan
              </label>
            </div>
            <div className="col-span-2">
              <div className="relative">
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  style={selectStyle}
                >
                  <option>Free - $0/month</option>
                  <option>Pro - $25/month</option>
                  <option>Team - $599/month</option>
                  <option>Enterprise - Custom</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#555" }}
                />
              </div>
              <p className="text-xs mt-2" style={{ color: "#555" }}>
                Which plan fits your organization's needs best?{" "}
                <a href="#" className="underline hover:opacity-80" style={{ color: "#a3a3a3" }}>
                  Learn more
                </a>
                .
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderTop: "1px solid #2e2e2e" }}
          >
            <button
              onClick={() => navigate("/dashboard/organizations")}
              className="px-4 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
              style={{
                color: "#a3a3a3",
                border: "1px solid #2e2e2e",
                backgroundColor: "transparent",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => navigate("/dashboard/org/vcuwjtqppzztgjwtvmta")}
              className="px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#3ecf8e22",
                border: "1px solid #3ecf8e55",
                color: "#3ecf8e",
                fontWeight: 500,
              }}
            >
              Create organization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}