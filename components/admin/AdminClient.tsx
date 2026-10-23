"use client";

import type { AdminsSection, SectionImage, SectionVideo } from "@/lib/types";
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
  deleteSectionVideoAction,
  markContactReadAction,
  saveSectionImageAction,
  saveSectionVideoAction,
  updateReviewAction,
  updateSectionImageAction,
  updateSectionVideoAction,
} from "@/app/admin/action";
import AdminSectionImages from "./AdminSectionImage";
import AdminSectionVideo from "./AdminSectionVideo";

interface AdminClientProps {
  reviews: Review[];
  contacts: ContactSubmission[];
  images: SectionImage[];
  videos: SectionVideo[];
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
  videos,
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

        {/* ── Images ──────────────────────────────────────────────────── */}
        {section === "images" && (
          <AdminSectionImages
            images={images}
            onUpdateImage={updateSectionImageAction}
            onDeleteImage={deleteSectionImageAction}
            onUploadImage={saveSectionImageAction}
          />
        )}

        {/* ── Videos ──────────────────────────────────────────────────── */}
        {section === "videos" && (
          <AdminSectionVideo
            videos={videos}
            onUpdateVideo={updateSectionVideoAction}
            onDeleteVideo={deleteSectionVideoAction}
            onUploadVideo={saveSectionVideoAction}
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
            onDeleteContact={deleteContactAction}
          />
        )}
      </div>
    </div>
  );
}
