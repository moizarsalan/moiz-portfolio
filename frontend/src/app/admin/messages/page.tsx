import AdminMessagesPanel from "@/components/admin/AdminMessagesPanel";

import AdminPanelShell from "@/components/admin/AdminPanelShell";

export default function AdminMessagesPage() {
  return (
    <AdminPanelShell>
      <div>
        <p
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.17em]
            text-primary
          "
        >
          Client Communication
        </p>

        <h1
          className="
            mt-3
            text-3xl
            font-bold
            tracking-[-0.045em]
            text-foreground
          "
        >
          Messages
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            text-sm
            leading-7
            text-muted
          "
        >
          Review messages submitted
          directly through your
          portfolio and keep track of
          client conversations.
        </p>

        <div className="mt-8">
          <AdminMessagesPanel />
        </div>
      </div>
    </AdminPanelShell>
  );
}