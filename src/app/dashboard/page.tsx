'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Project } from '@/lib/supabase';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName) return;

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectName }),
      });
      if (res.ok) {
        setNewProjectName('');
        setShowModal(false);
        fetchProjects();
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <Link href="/" className="text-xl font-bold text-blue-600">QuickFeedback</Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Free Tier</span>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            U
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            + New Project
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-6">Create your first project to start collecting feedback.</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/${project.id}`}
                className="block bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{project.url || 'No URL specified'}</p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  View Feedbacks →
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Monetization Placeholder */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-1">Unlock Advanced Analytics</h3>
            <p className="text-blue-100">Export feedback to CSV, remove branding, and get email alerts.</p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-md font-bold hover:bg-blue-50">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. My Awesome App"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
