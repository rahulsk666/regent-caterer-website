import { getAllContacts, getAllReviews, getDashboardStats } from "@/lib/db";
import AdminClient from "@/components/admin/AdminClient";

export default async function AdminDashboard() {
  const [reviews, contacts, stats] = await Promise.all([
    getAllReviews(),
    getAllContacts(),
    getDashboardStats(),
  ]);

  return <AdminClient reviews={reviews} contacts={contacts} stats={stats} />;
}
