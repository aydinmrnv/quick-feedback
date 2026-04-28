'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Project, Feedback } from '@/lib/supabase';

export default function ProjectDetails({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, feedRes] = await Promise.all([
          fetch('/api/projects'),
          fetch(`/api/feedback/${projectId}`),
        ]);
        
        const projects = await projRes.json();
        const projectData = projects.find((p: Project) => p.id === projectId);
        setProject(projectData);
        
        const feedbacksData = await feedRes.json();
        setFeedbacks(feedbacksData.sort((a: Feedback, b: Feedback) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const embedCode = `<iframe 
  src="${typeof window !== 'undefined' ? window.location.origin : ''}/widget/${projectId}" 
  width="100%" 
  height="400px" 
  frameborder="0"
></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  if (loading) return <div className="p-12 text-center text-gray-500">Loading project...</div>;
  if (!project) return <div className="p-12 text-center text-red-500">Project not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">← Back</Link>
          <span className="text-xl font-bold text-gray-900">{project.name}</span>
        </div>
        <Link href="/" className="text-xl font-bold text-blue-600">QuickFeedback</Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Embed Section */}
        <section className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-12">
          <h2 className="text-lg font-bold mb-4">Embed Widget</h2>
          <p className="text-gray-600 mb-4 text-sm">Copy and paste this code into your website where you want the feedback widget to appear.</p>
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{embedCode}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 font-bold"
            >
              {copying ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </section>

        {/* Feedback List */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Responses ({feedbacks.length})</h2>
            <button className="text-blue-600 text-sm font-medium hover:underline">
              Export to CSV (Pro)
            </button>
          </div>

          {feedbacks.length === 0 ? (
            <div className="bg-white p-12 text-center border border-gray-200 rounded-xl text-gray-500">
              No feedback received yet. Share your link to start collecting responses!
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((f) => (
                <div key={f.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} className={`w-5 h-5 ${i <= f.rating ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{new Date(f.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-800 italic">"{f.comment || 'No comment provided'}"</p>
                  {f.url && <p className="mt-2 text-xs text-blue-500 truncate">Source: {f.url}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
