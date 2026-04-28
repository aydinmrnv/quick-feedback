'use client';

import { useState, use } from 'react';

export default function Widget({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          rating,
          comment,
          url: typeof window !== 'undefined' ? document.referrer : '',
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center bg-white p-6 text-center">
        <div>
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h2>
          <p className="text-gray-500 text-sm mb-4">Your feedback helps us improve.</p>
          <a href="/" target="_blank" className="text-xs text-gray-400 hover:text-blue-500">
            Powered by QuickFeedback
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white p-4 sm:p-6 overflow-hidden">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <h3 className="font-bold text-lg text-gray-900 mb-4 text-center">How was your experience?</h3>
        
        <div className="flex justify-between gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i)}
              className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center text-lg font-bold ${
                rating === i
                  ? 'bg-blue-600 border-blue-600 text-white transform scale-110'
                  : 'bg-white border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500'
              }`}
            >
              {i}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <textarea
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            rows={3}
            placeholder="Tell us more... (Optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={!rating || submitting}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
            !rating || submitting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md active:transform active:scale-95'
          }`}
        >
          {submitting ? 'Sending...' : 'Send Feedback'}
        </button>

        <div className="mt-4 text-center">
          <a href="/" target="_blank" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-blue-500 font-medium">
            Powered by QuickFeedback
          </a>
        </div>
      </form>
    </div>
  );
}
