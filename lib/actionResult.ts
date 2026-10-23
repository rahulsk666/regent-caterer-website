import { ActionResult } from "@/lib/types";

/**
 * Admin server actions never throw — they catch internally and resolve with
 * `{ success: false, error }`. `toast.promise` (sonner) can only react to
 * resolve vs. reject, so a resolved `{success:false}` renders as a success
 * toast. Wrap the action call in `unwrap` to turn a failed result into a
 * rejection, which also lets `useOptimistic` state revert naturally once the
 * transition it was applied in ends without new props landing.
 */
export async function unwrap(
  promise: Promise<ActionResult>,
  fallback: string,
): Promise<ActionResult> {
  const result = await promise;
  if (!result.success) throw new Error(result.error || fallback);
  return result;
}
