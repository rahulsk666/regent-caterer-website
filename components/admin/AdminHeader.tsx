import { AdminsSection, DashboardStats } from "@/lib/types";
import { IconLogout } from "@tabler/icons-react";
import { redirect } from "next/navigation";

interface AdminHeaderProps {
  stats: DashboardStats;
  section: AdminsSection;
  setSection: (section: AdminsSection) => void;
}

export default function AdminHeader({
  stats,
  section,
  setSection,
}: AdminHeaderProps) {
  // ── nav tabs ────────────────────────────────────────────────────────────
  const NAV: { key: AdminsSection; label: string; badge?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "services", label: "Services" },
    {
      key: "reviews",
      label: "Reviews",
      badge: stats.pendingReviews || undefined,
    },
    {
      key: "contacts",
      label: "Contacts",
      badge: stats.unreadContacts || undefined,
    },
  ];
  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    redirect("/admin/login");
  };
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="container-app flex items-center justify-between h-16 gap-4">
        <h1 className="text-xl font-bold shrink-0">Admin</h1>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {NAV.map(({ key, label, badge }) => (
            <button
              key={key}
              onClick={() => {
                setSection(key);
              }}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                section === key
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label}
              {badge !== undefined && badge > 0 && (
                <span
                  className={`inline-flex items-center justify-center h-5 min-w-5 rounded-full text-xs font-bold px-1 ${
                    section === key
                      ? "bg-white text-slate-900"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 shrink-0"
        >
          <IconLogout className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
