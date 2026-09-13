import AdminDashboardPanel from "@/components/admin/AdminDashboardPanel";
import AdminPanelShell from "@/components/admin/AdminPanelShell";

export default function AdminDashboardPage() {
  return (
    <AdminPanelShell>
      <AdminDashboardPanel />
    </AdminPanelShell>
  );
}