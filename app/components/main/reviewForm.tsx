"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Review = {
  sessionId: number;
  status: "SAFE" | "RISK" | "FLAGGED";
  note?: string;
};

interface ReviewFormProps {
  sessionId?: string;
  review?: Review;
}

export default function ReviewForm({ review, sessionId }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noteValue, setNoteValue] = useState(review?.note || "");
  const [statusValue, setStatusValue] = useState(review?.status || "SAFE");
  const [existingReview, setExistingReview] = useState<Review | undefined>(
    review,
  );
  const router = useRouter();

  useEffect(() => {
    if (review) {
      setExistingReview(review);
      setNoteValue(review.note || "");
      setStatusValue(review.status || "SAFE");
    }
  }, [review]);

  const isButtonDisabled = isSubmitting || !noteValue.trim();

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const finalStatus = formData.get("status") as Review["status"];
    const note = formData.get("note") as string;

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: Number(sessionId),
          finalStatus,
          note,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      const updatedReview: Review = {
        sessionId: Number(sessionId),
        status: finalStatus,
        note: note,
      };

      toast.success(existingReview ? "Review updated" : "Review saved");
      setExistingReview(updatedReview);
      router.refresh();
    } catch (err) {
      toast.error(`Could not save review: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden my-8">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Supervisor Review
        </h3>
        {existingReview && (
          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
            SUBMITTED
          </span>
        )}
      </div>

      {existingReview && !isSubmitting ? (
        <div className="p-6 bg-slate-50 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase">
              Status:
            </span>
            <span
              className={`text-xs font-bold px-2 py-1 rounded ${
                existingReview.status === "SAFE"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {existingReview.status}
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
              Notes:
            </span>
            <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200 italic">
              {existingReview.note}
            </p>
          </div>
          <button
            onClick={() => setExistingReview(undefined)}
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            Edit Review
          </button>
        </div>
      ) : (
        <form action={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Resolution
            </label>
            <select
              name="status"
              defaultValue={statusValue || "SAFE"}
              className="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            >
              <option value="SAFE">Mark as Safe</option>
              <option value="FLAGGED">Flag for Escalation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Internal Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              name="note"
              value={noteValue}
              onChange={(e) => setNoteValue(e.target.value)}
              placeholder="Add context for the team (required)..."
              className="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              rows={4}
            />
          </div>

          <button
            disabled={isButtonDisabled}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
              ${
                isButtonDisabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-black text-white active:scale-[0.98] shadow-md hover:shadow-lg"
              }`}
          >
            {isSubmitting
              ? "Saving..."
              : existingReview
                ? "Update Review"
                : "Complete Review"}
          </button>
        </form>
      )}
    </div>
  );
}
