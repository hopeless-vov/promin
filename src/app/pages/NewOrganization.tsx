import { useState } from "react";
import { useNavigate } from "react-router";
import { TopNav } from "../components/TopNav";
import { ChevronDown } from "lucide-react";

const inputCls =
  "w-full rounded-md text-sm bg-surface border border-app-border text-neutral-300 px-3 py-2 outline-none focus:border-brand transition-[border-color]";

const selectCls =
  "w-full appearance-none rounded-md text-sm bg-surface border border-app-border text-neutral-300 pl-3 pr-9 py-2.5 outline-none focus:border-brand transition-[border-color] cursor-pointer";

export function NewOrganization() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [orgType, setOrgType] = useState("Personal");
  const [plan, setPlan] = useState("Free - $0/month");

  return (
    <div className="text-white">
      <TopNav variant="plain" title="New organization" />

      <div className="flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl rounded-xl overflow-hidden bg-surface border border-app-border">
          {/* Header */}
          <div className="px-6 py-5 border-b border-app-border">
            <h2 className="text-white text-base font-semibold mb-1">Create a new organization</h2>
            <p className="text-sm leading-relaxed text-neutral-400">
              Organizations are a way to group your branches together. Each organization can be
              configured with different team members and billing settings.
            </p>
          </div>

          {/* Name field */}
          <div className="px-6 py-5 grid grid-cols-3 gap-6 items-start border-b border-app-border">
            <div>
              <label className="text-sm font-medium text-neutral-300">Name</label>
            </div>
            <div className="col-span-2">
              <input
                placeholder="Organization name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
              />
              <p className="text-xs mt-2 text-[#555]">
                What's the name of your company or team? You can change this later.
              </p>
            </div>
          </div>

          {/* Type field */}
          <div className="px-6 py-5 grid grid-cols-3 gap-6 items-start border-b border-app-border">
            <div>
              <label className="text-sm font-medium text-neutral-300">Type</label>
            </div>
            <div className="col-span-2">
              <div className="relative">
                <select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value)}
                  className={selectCls}
                >
                  <option>Personal</option>
                  <option>Company</option>
                  <option>Agency</option>
                  <option>Non-profit</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]"
                />
              </div>
              <p className="text-xs mt-2 text-[#555]">What best describes your organization?</p>
            </div>
          </div>

          {/* Plan field */}
          <div className="px-6 py-5 grid grid-cols-3 gap-6 items-start">
            <div>
              <label className="text-sm font-medium text-neutral-300">Plan</label>
            </div>
            <div className="col-span-2">
              <div className="relative">
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className={selectCls}
                >
                  <option>Free - $0/month</option>
                  <option>Pro - $25/month</option>
                  <option>Team - $599/month</option>
                  <option>Enterprise - Custom</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]"
                />
              </div>
              <p className="text-xs mt-2 text-[#555]">
                Which plan fits your organization's needs best?{" "}
                <a href="#" className="underline hover:opacity-80 text-neutral-400">
                  Learn more
                </a>
                .
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-app-border">
            <button
              onClick={() => navigate("/dashboard/organizations")}
              className="px-4 py-2 rounded-lg text-sm text-neutral-400 border border-app-border bg-transparent transition-colors hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={() => navigate("/dashboard/org/vcuwjtqppzztgjwtvmta")}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90"
            >
              Create organization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}