import {
  getAllContacts,
  getAllReviews,
  getAllSectionImages,
  getAllSectionVideos,
  getDashboardStats,
} from "@/lib/db";
import AdminClient from "@/components/admin/AdminClient";

export default async function AdminDashboard() {
  const [reviews, contacts, stats, images, videos] = await Promise.all([
    getAllReviews(),
    getAllContacts(),
    getDashboardStats(),
    getAllSectionImages(),
    getAllSectionVideos(),
  ]);

  return (
    <AdminClient
      reviews={reviews}
      contacts={contacts}
      stats={stats}
      images={images}
      videos={videos}
    />
  );
}
