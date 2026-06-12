export async function updateReviewApi(
  id: number,
  updates: {
    approved?: boolean;
    highlightedHome?: boolean;
  },
) {
  const response = await fetch(`/api/admin/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update review");
  }
}
