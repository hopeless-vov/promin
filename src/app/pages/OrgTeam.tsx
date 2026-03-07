import { useState } from "react";
import { Search, BookOpen, UserPlus, X, ChevronDown } from "lucide-react";

interface Member {
  id: string;
  email: string;
  isYou: boolean;
  mfaEnabled: boolean;
  role: string;
}

const mockMembers: Member[] = [
  { id: "1", email: "user@srm.com", isYou: true, mfaEnabled: false, role: "Owner" },
  { id: "2", email: "sarah.johnson@acmecorp.com", isYou: false, mfaEnabled: true, role: "Admin" },
  { id: "3", email: "mike.chen@acmecorp.com", isYou: false, mfaEnabled: false, role: "Member" },
];

function InviteModal({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState("Member");
  const [emails, setEmails] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl z-10 bg-surface border border-app-border">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-app-border">
          <h2 className="text-white text-base font-semibold">Invite team members</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition-colors text-neutral-400"
          >
            <X size={16} />
          </button>
        </div>

        {/* SSO info box */}
        <div className="mx-6 mt-5 p-4 rounded-lg bg-[#252520] border border-[#333]">
          <p className="text-white text-sm mb-1 font-medium">Single Sign-On (SSO) available</p>
          <p className="text-xs leading-relaxed mb-3 text-neutral-400">
            Enforce login via your company identity provider for added security and access control.
            Available on Team plan and above.
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded text-xs border border-app-border text-neutral-300 transition-colors hover:bg-white/5">
              Learn more
            </button>
            <button className="px-3 py-1.5 rounded text-xs font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90">
              Upgrade to Team
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="px-6 pt-5">
          <label className="block text-sm mb-1.5 text-neutral-300">Role</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg text-sm outline-none appearance-none cursor-pointer px-3 py-2 bg-surface border border-app-border text-neutral-300"
            >
              <option>Owner</option>
              <option>Admin</option>
              <option>Member</option>
              <option>Developer</option>
              <option>Read Only</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]" />
          </div>
        </div>

        {/* Email addresses */}
        <div className="px-6 pt-4 pb-6">
          <label className="block text-sm mb-1.5 text-neutral-300">Email addresses</label>
          <textarea
            placeholder="name@example.com, name2@example.com, ..."
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            rows={3}
            className="w-full rounded-lg text-sm outline-none resize-none px-3 py-2.5 bg-neutral-900 border border-brand/[33%] text-neutral-300 shadow-[0_0_0_2px_#3ecf8e18]"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-app-border">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm border border-app-border text-neutral-400 transition-colors hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90"
          >
            Send invitation
          </button>
        </div>
      </div>
    </div>
  );
}

export function OrgTeam() {
  const [search, setSearch] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [members] = useState<Member[]>(mockMembers);

  const filtered = members.filter((m) =>
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="p-8 text-white">
        <h1 className="text-white text-[22px] font-semibold mb-6">Team</h1>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-app-border w-[220px]">
            <Search size={13} className="text-[#555] flex-shrink-0" />
            <input
              placeholder="Filter members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1 text-neutral-300"
            />
          </div>

          <div className="flex-1" />

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-app-border text-neutral-400 transition-colors hover:bg-white/5">
            <BookOpen size={14} />
            Docs
          </button>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-brand/[13%] border border-brand/[33%] text-brand transition-opacity hover:opacity-90"
          >
            <UserPlus size={14} />
            Invite members
          </button>
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden border border-app-border">
          {/* Table header */}
          <div
            className="grid px-4 py-3 bg-surface-dark border-b border-app-border"
            style={{ gridTemplateColumns: "1fr 180px 180px 120px" }}
          >
            <span className="text-xs text-[#555] font-medium tracking-[0.06em]">MEMBER</span>
            <span className="text-xs text-[#555] font-medium tracking-[0.06em]">2FA</span>
            <span className="text-xs text-[#555] font-medium tracking-[0.06em]">ROLE</span>
            <span />
          </div>

          {/* Members */}
          {filtered.map((member, i) => (
            <div
              key={member.id}
              className={`grid items-center px-4 py-3 bg-surface ${
                i < filtered.length - 1 ? "border-b border-app-border" : ""
              }`}
              style={{ gridTemplateColumns: "1fr 180px 180px 120px" }}
            >
              {/* Member info */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-neutral-800 border border-[#383838]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <circle cx="12" cy="8" r="3.5" stroke="#a3a3a3" strokeWidth="1.3" />
                    <path d="M4 20c0-4.418 3.582-7 8-7s8 2.582 8 7" stroke="#a3a3a3" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm text-neutral-300">{member.email}</span>
                {member.isYou && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold tracking-[0.04em] bg-[#2a2a2a] border border-[#383838] text-neutral-400">
                    YOU
                  </span>
                )}
              </div>

              {/* MFA */}
              <div className="flex items-center gap-2">
                <span className={`text-sm ${member.mfaEnabled ? "text-brand" : "text-neutral-400"}`}>
                  {member.mfaEnabled ? "Enabled" : "Disabled"}
                </span>
                {!member.mfaEnabled && <X size={13} className="text-[#555]" />}
              </div>

              {/* Role */}
              <div>
                <span className="text-sm text-neutral-300">{member.role}</span>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                {member.isYou ? (
                  <button className="px-3 py-1.5 rounded text-xs border border-app-border text-neutral-400 transition-colors hover:bg-white/5">
                    Leave team
                  </button>
                ) : (
                  <button className="px-3 py-1.5 rounded text-xs border border-app-border text-neutral-400 transition-colors hover:bg-red-500/10 hover:border-red-500/30">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Count row */}
          <div className="px-4 py-3 text-xs bg-surface-dark text-[#555] border-t border-app-border">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}
    </>
  );
}
