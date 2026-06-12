import {
  getAllContacts,
  getAllReviews,
  getAllSectionImages,
  getDashboardStats,
} from "@/lib/db";
import AdminClient from "@/components/admin/AdminClient";

export default async function AdminDashboard() {
  const [reviews, contacts, stats, images] = await Promise.all([
    getAllReviews(),
    getAllContacts(),
    getDashboardStats(),
    getAllSectionImages(),
  ]);

  return (
    <AdminClient
      reviews={reviews}
      contacts={contacts}
      stats={stats}
      images={images}
    />
  );
}
