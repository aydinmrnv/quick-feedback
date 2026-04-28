import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;
  const db = getDB();
  const feedbacks = db.feedbacks.filter((f) => f.projectId === projectId);
  
  return NextResponse.json(feedbacks);
}
