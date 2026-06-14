import { ActionResult, ContactSubmission } from "@/lib/types";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";

interface AdminContactsSectionProps {
  contacts: ContactSubmission[];

  onMarkRead: (id: number, read: boolean) => Promise<ActionResult>;

  onDeleteContact: (id: number) => Promise<ActionResult>;
}
export default function AdminContactSection({
  contacts,
  onMarkRead,
  onDeleteContact,
}: AdminContactsSectionProps) {
  const handleMarkRead = async (id: number, read: boolean) => {
    toast.promise(onMarkRead(id, read), {
      loading: "Updating contact...",
      success: (result) =>
        result.success ? "Contact updated" : (result.error ?? "Update failed"),
      error: "Failed to update contact",
    });
  };

  const handleDeleteContact = async (id: number) => {
    toast.promise(onDeleteContact(id), {
      loading: "Deleting contact...",
      success: (result) =>
        result.success ? "Contact deleted" : (result.error ?? "Delete failed"),
      error: "Failed to delete contact",
    });
  };
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
          {contacts.filter((c) => !c.read).length} unread
        </span>
      </div>
      <div className="space-y-3">
        {contacts.length === 0 && (
          <p className="text-center py-20 text-slate-400">No messages yet</p>
        )}
        {contacts.map((c) => (
          <div
            key={c.id}
            className={`rounded-3xl border bg-white p-5 shadow-sm ${!c.read ? "border-blue-200 bg-blue-50/30" : "border-slate-200"}`}
          >
            <div className="flex flex-wrap gap-4 items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {!c.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  )}
                  <p className="font-semibold">{c.name}</p>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-sm text-brand-blue hover:underline"
                  >
                    {c.email}
                  </a>
                  {c.phone && (
                    <span className="text-sm text-slate-500">{c.phone}</span>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-700 mb-1">
                  {c.service}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {c.message}
                </p>
                {c.createdAt && (
                  <p className="text-xs text-slate-400 mt-2">
                    {new Date(c.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => handleMarkRead(c.id!, !c.read)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  {c.read ? "Mark unread" : "Mark read"}
                </button>
                <a
                  href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.service)}`}
                  className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100 text-center"
                >
                  Reply by email
                </a>
                <button
                  onClick={() => handleDeleteContact(c.id!)}
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-red-50 border border-red-200 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
                >
                  <IconTrash className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
