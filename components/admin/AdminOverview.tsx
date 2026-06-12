import { ContactSubmission, Review, DashboardStats } from "@/lib/types";
import StatCard from "./StatCard";
import { StarDisplay } from "../ui/StarRating";

interface AdminOverviewProps {
  stats: DashboardStats;
  contacts: ContactSubmission[];
  reviews: Review[];
  onViewContacts: () => void;
  onViewReviews: () => void;
}

export default function AdminOverview({
  stats,
  contacts,
  reviews,
  onViewContacts,
  onViewReviews,
}: AdminOverviewProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Reviews"
          value={stats.reviews}
          sub="total approved"
          color="bg-emerald-600"
        />
        <StatCard
          label="Pending Reviews"
          value={stats.pendingReviews}
          sub="awaiting approval"
          color="bg-amber-500"
        />
        <StatCard
          label="Contacts"
          value={stats.contacts}
          sub="total messages"
          color="bg-violet-600"
        />
        <StatCard
          label="Unread Messages"
          value={stats.unreadContacts}
          sub="need attention"
          color="bg-rose-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent contacts */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Messages</h3>
            <button
              onClick={onViewContacts}
              className="text-xs text-brand-blue hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {contacts.slice(0, 5).map((c) => (
              <div
                key={c.id}
                className={`flex items-start gap-3 p-3 rounded-2xl ${!c.read ? "bg-blue-50" : "bg-slate-50"}`}
              >
                <div
                  className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!c.read ? "bg-blue-500" : "bg-slate-300"}`}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  <p className="text-xs text-slate-500 truncate">{c.service}</p>
                </div>
              </div>
            ))}
            {contacts.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">
                No messages yet
              </p>
            )}
          </div>
        </div>

        {/* Pending reviews */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Pending Reviews</h3>
            <button
              onClick={onViewReviews}
              className="text-xs text-brand-blue hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {reviews
              .filter((r) => !r.approved)
              .slice(0, 5)
              .map((r) => (
                <div
                  key={r.id}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50"
                >
                  <div className="mt-1 w-2 h-2 rounded-full shrink-0 bg-amber-400" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">{r.name}</p>
                      <StarDisplay rating={r.rating} size={12} />
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {r.review}
                    </p>
                  </div>
                </div>
              ))}
            {reviews.filter((r) => !r.approved).length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">
                No pending reviews
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
