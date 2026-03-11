import { useState } from "react";
import { Search, BookOpen, UserPlus, X, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

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
      <Card className="relative w-full max-w-lg z-10">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-base font-semibold">Invite team members</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition-colors text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <Separator />

        {/* SSO info box */}
        <div className="mx-6 mt-5 p-4 rounded-lg bg-muted border border-border">
          <p className="text-sm mb-1 font-medium">Single Sign-On (SSO) available</p>
          <p className="text-xs leading-relaxed mb-3 text-muted-foreground">
            Enforce login via your company identity provider for added security and access control.
            Available on Team plan and above.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Learn more
            </Button>
            <Button size="sm">
              Upgrade to Team
            </Button>
          </div>
        </div>

        {/* Role */}
        <div className="px-6 pt-5">
          <label className="block text-sm mb-1.5 text-secondary-foreground">Role</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg text-sm outline-none appearance-none cursor-pointer px-3 py-2 bg-card border border-border text-secondary-foreground"
            >
              <option>Owner</option>
              <option>Admin</option>
              <option>Member</option>
              <option>Developer</option>
              <option>Read Only</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-subtle" />
          </div>
        </div>

        {/* Email addresses */}
        <div className="px-6 pt-4 pb-6">
          <label className="block text-sm mb-1.5 text-secondary-foreground">Email addresses</label>
          <textarea
            placeholder="name@example.com, name2@example.com, ..."
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            rows={3}
            className="w-full rounded-lg text-sm outline-none resize-none px-3 py-2.5 bg-background border border-brand/[33%] text-secondary-foreground shadow-[0_0_0_2px_#3ecf8e18]"
          />
        </div>

        {/* Footer */}
        <Separator />
        <div className="px-6 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>
            Send invitation
          </Button>
        </div>
      </Card>
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
      <div className="p-8">
        <h1 className="text-[22px] font-semibold mb-6">Team</h1>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative w-[220px]">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <Input
              placeholder="Filter members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex-1" />

          <Button variant="outline">
            <BookOpen size={14} />
            Docs
          </Button>
          <Button onClick={() => setShowInviteModal(true)}>
            <UserPlus size={14} />
            Invite members
          </Button>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          {/* Table header */}
          <div
            className="grid px-4 py-3 bg-surface-dark border-b border-border"
            style={{ gridTemplateColumns: "1fr 180px 180px 120px" }}
          >
            <span className="text-xs text-subtle font-medium tracking-[0.06em]">MEMBER</span>
            <span className="text-xs text-subtle font-medium tracking-[0.06em]">2FA</span>
            <span className="text-xs text-subtle font-medium tracking-[0.06em]">ROLE</span>
            <span />
          </div>

          {/* Members */}
          {filtered.map((member, i) => (
            <div
              key={member.id}
              className={`grid items-center px-4 py-3 ${
                i < filtered.length - 1 ? "border-b border-border" : ""
              }`}
              style={{ gridTemplateColumns: "1fr 180px 180px 120px" }}
            >
              {/* Member info */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-muted border border-border">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <circle cx="12" cy="8" r="3.5" stroke="#a3a3a3" strokeWidth="1.3" />
                    <path d="M4 20c0-4.418 3.582-7 8-7s8 2.582 8 7" stroke="#a3a3a3" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm text-secondary-foreground">{member.email}</span>
                {member.isYou && (
                  <Badge variant="secondary" className="text-[10px] tracking-[0.04em]">YOU</Badge>
                )}
              </div>

              {/* MFA */}
              <div className="flex items-center gap-2">
                <span className={`text-sm ${member.mfaEnabled ? "text-brand" : "text-muted-foreground"}`}>
                  {member.mfaEnabled ? "Enabled" : "Disabled"}
                </span>
                {!member.mfaEnabled && <X size={13} className="text-subtle" />}
              </div>

              {/* Role */}
              <div>
                <span className="text-sm text-secondary-foreground">{member.role}</span>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                {member.isYou ? (
                  <Button variant="outline" size="sm">
                    Leave team
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="hover:bg-red-500/10 hover:border-red-500/30">
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Count row */}
          <div className="px-4 py-3 text-xs bg-surface-dark text-subtle border-t border-border">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </div>
        </Card>
      </div>

      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}
    </>
  );
}
