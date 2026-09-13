import AdminPanelShell from "@/components/admin/AdminPanelShell";

import ProjectRequestsPanel from "@/components/admin/ProjectRequestsPanel";

export default function AdminProjectRequestsPage() {
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
          Client Pipeline
        </p>

        <h1
          className="
            mt-3
            text-3xl
            font-bold
            tracking-[-0.045em]
          "
        >
          Project Requests
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
          Review incoming project
          briefs, client information,
          scope and current workflow
          status.
        </p>

        <div className="mt-8">
          <ProjectRequestsPanel />
        </div>
      </div>
    </AdminPanelShell>
  );
}