"use client";

import type { AdminsSection, SectionImage } from "@/lib/types";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminReviewsSection from "@/components/admin/AdminReviewsSection";
import AdminContactSection from "@/components/admin/AdminContactSection";
import { ContactSubmission, Review } from "@/lib/types";
import { useState } from "react";
import {
  deleteContactAction,
  deleteReviewAction,
  deleteSectionImageAction,
  markContactReadAction,
  saveSectionImageAction,
  updateReviewAction,
  updateSectionImageAction,
} from "@/app/admin/action";
import AdminSectionImages from "./AdminSectionImage";

interface AdminClientProps {
  reviews: Review[];
  contacts: ContactSubmission[];
  images: SectionImage[];
  stats: {
    reviews: number;
    pendingReviews: number;
    contacts: number;
    unreadContacts: number;
  };
}

export default function AdminClient({
  reviews,
  contacts,
  images,
  stats,
}: AdminClientProps) {
  const [section, setSection] = useState<AdminsSection>("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <AdminHeader stats={stats} section={section} setSection={setSection} />
      <div className="container-app py-8">
        {/* ── OVERVIEW ─────────────────────────────────────────────────── */}
        {section === "overview" && (
          <AdminOverview
            stats={stats}
            contacts={contacts}
            reviews={reviews}
            onViewContacts={() => setSection("contacts")}
            onViewReviews={() => setSection("reviews")}
          />
        )}

        {section === "images" && (
          <AdminSectionImages
            images={images}
            onUpdateImage={updateSectionImageAction}
            onDeleteImage={deleteSectionImageAction}
            onUploadImage={saveSectionImageAction}
          />
        )}

        {/* ── REVIEWS ──────────────────────────────────────────────────── */}
        {section === "reviews" && (
          <AdminReviewsSection
            reviews={reviews}
            onUpdateReview={updateReviewAction}
            onDeleteReview={deleteReviewAction}
          />
        )}

        {/* ── CONTACTS ─────────────────────────────────────────────────── */}
        {section === "contacts" && (
          <AdminContactSection
            contacts={contacts}
            onMarkRead={markContactReadAction}
            onDelete={deleteContactAction}
          />
        )}
      </div>
    </div>
  );
}
