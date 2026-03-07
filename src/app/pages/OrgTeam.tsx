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
  {
    id: "1",
    email: "user@srm.com",
    isYou: true,
    mfaEnabled: false,
    role: "Owner",
  },
  {
    id: "2",
    email: "sarah.johnson@acmecorp.com",
    isYou: false,
    mfaEnabled: true,
    role: "Admin",
  },
  {
    id: "3",
    email: "mike.chen@acmecorp.com",
    isYou: false,
    mfaEnabled: false,
    role: "Member",
  },
];

function InviteModal({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState("Member");
  const [emails, setEmails] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-xl z-10"
        style={{ backgroundColor: "#1e1e1e", border: "1px solid #2e2e2e" }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #2e2e2e" }}
        >
          <h2 className="text-white text-base" style={{ fontWeight: 600 }}>
            Invite team members
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            style={{ color: "#a3a3a3" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* SSO info box */}
        <div
          className="mx-6 mt-5 p-4 rounded-lg"
          style={{ backgroundColor: "#252520", border: "1px solid #333" }}
        >
          <p className="text-white text-sm mb-1" style={{ fontWeight: 500 }}>
            Single Sign-On (SSO) available
          </p>
          <p className="text-xs leading-relaxed mb-3" style={{ color: "#a3a3a3" }}>
            Enforce login via your company identity provider for added security and
            access control. Available on Team plan and above.
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 rounded text-xs transition-colors hover:bg-white/5"
              style={{
                border: "1px solid #2e2e2e",
                color: "#d4d4d4",
              }}
            >
              Learn more
            </button>
            <button
              className="px-3 py-1.5 rounded text-xs transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#3ecf8e22",
                border: "1px solid #3ecf8e55",
                color: "#3ecf8e",
                fontWeight: 500,
              }}
            >
              Upgrade to Team
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="px-6 pt-5">
          <label className="block text-sm mb-1.5" style={{ color: "#d4d4d4" }}>
            Role
          </label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg text-sm outline-none appearance-none cursor-pointer pr-9"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #2e2e2e",
                color: "#d4d4d4",
                padding: "8px 12px",
              }}
            >
              <option>Owner</option>
              <option>Admin</option>
              <option>Member</option>
              <option>Developer</option>
              <option>Read Only</option>
            </select>
            <ChevronDown
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#555" }}
            />
          </div>
        </div>

        {/* Email addresses */}
        <div className="px-6 pt-4 pb-6">
          <label className="block text-sm mb-1.5" style={{ color: "#d4d4d4" }}>
            Email addresses
          </label>
          <textarea
            placeholder="name@example.com, name2@example.com, ..."
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            rows={3}
            className="w-full rounded-lg text-sm outline-none resize-none"
            style={{
              backgroundColor: "#171717",
              border: "1px solid #3ecf8e55",
              color: "#d4d4d4",
              padding: "10px 12px",
              boxShadow: "0 0 0 2px #3ecf8e18",
            }}
          />
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ borderTop: "1px solid #2e2e2e" }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
            style={{
              border: "1px solid #2e2e2e",
              color: "#a3a3a3",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#3ecf8e22",
              border: "1px solid #3ecf8e55",
              color: "#3ecf8e",
              fontWeight: 500,
            }}
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
      <div className="p-8" style={{ color: "#fff" }}>
        <h1 className="text-white mb-6" style={{ fontSize: "22px", fontWeight: 600 }}>
          Team
        </h1>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              backgroundColor: "#1e1e1e",
              border: "1px solid #2e2e2e",
              width: "220px",
            }}
          >
            <Search size={13} style={{ color: "#555" }} />
            <input
              placeholder="Filter members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
              style={{ color: "#d4d4d4" }}
            />
          </div>

          <div className="flex-1" />

          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
            style={{
              border: "1px solid #2e2e2e",
              color: "#a3a3a3",
            }}
          >
            <BookOpen size={14} />
            Docs
          </button>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#3ecf8e22",
              border: "1px solid #3ecf8e55",
              color: "#3ecf8e",
              fontWeight: 500,
            }}
          >
            <UserPlus size={14} />
            Invite members
          </button>
        </div>

        {/* Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #2e2e2e" }}
        >
          {/* Table header */}
          <div
            className="grid px-4 py-3"
            style={{
              gridTemplateColumns: "1fr 180px 180px 120px",
              backgroundColor: "#1a1a1a",
              borderBottom: "1px solid #2e2e2e",
            }}
          >
            <span className="text-xs" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.06em" }}>
              MEMBER
            </span>
            <span className="text-xs" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.06em" }}>
              2FA
            </span>
            <span className="text-xs" style={{ color: "#555", fontWeight: 500, letterSpacing: "0.06em" }}>
              ROLE
            </span>
            <span />
          </div>

          {/* Members */}
          {filtered.map((member, i) => (
            <div
              key={member.id}
              className="grid items-center px-4 py-3"
              style={{
                gridTemplateColumns: "1fr 180px 180px 120px",
                backgroundColor: "#1e1e1e",
                borderBottom:
                  i < filtered.length - 1 ? "1px solid #2e2e2e" : "none",
              }}
            >
              {/* Member info */}
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#262626", border: "1px solid #383838" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <circle cx="12" cy="8" r="3.5" stroke="#a3a3a3" strokeWidth="1.3" />
                    <path d="M4 20c0-4.418 3.582-7 8-7s8 2.582 8 7" stroke="#a3a3a3" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "#d4d4d4" }}>
                  {member.email}
                </span>
                {member.isYou && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: "#2a2a2a",
                      border: "1px solid #383838",
                      color: "#a3a3a3",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    YOU
                  </span>
                )}
              </div>

              {/* MFA */}
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: member.mfaEnabled ? "#3ecf8e" : "#a3a3a3" }}>
                  {member.mfaEnabled ? "Enabled" : "Disabled"}
                </span>
                {!member.mfaEnabled && (
                  <X size={13} style={{ color: "#555" }} />
                )}
              </div>

              {/* Role */}
              <div>
                <span className="text-sm" style={{ color: "#d4d4d4" }}>
                  {member.role}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                {member.isYou ? (
                  <button
                    className="px-3 py-1.5 rounded text-xs transition-colors hover:bg-white/5"
                    style={{
                      border: "1px solid #2e2e2e",
                      color: "#a3a3a3",
                    }}
                  >
                    Leave team
                  </button>
                ) : (
                  <button
                    className="px-3 py-1.5 rounded text-xs transition-colors hover:bg-red-500/10 hover:border-red-500/30"
                    style={{
                      border: "1px solid #2e2e2e",
                      color: "#a3a3a3",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Count row */}
          <div
            className="px-4 py-3 text-xs"
            style={{
              backgroundColor: "#1a1a1a",
              color: "#555",
              borderTop: "1px solid #2e2e2e",
            }}
          >
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
