import { NextResponse } from 'next/server';
import { getDB, saveDB, Feedback } from '@/lib/db';

export async function POST(request: Request) {
  const { projectId, rating, comment, url } = await request.json();

  if (!projectId || !rating) {
    return NextResponse.json({ error: 'Project ID and rating are required' }, { status: 400 });
  }

  const db = getDB();
  const project = db.projects.find((p) => p.id === projectId);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const newFeedback: Feedback = {
    id: crypto.randomUUID(),
    projectId,
    rating,
    comment,
    url,
    createdAt: new Date().toISOString(),
  };

  db.feedbacks.push(newFeedback);
  saveDB(db);

  return NextResponse.json(newFeedback);
}
