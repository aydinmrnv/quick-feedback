import { NextResponse } from 'next/server';
import { getDB, saveDB, Project } from '@/lib/db';

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.projects);
}

export async function POST(request: Request) {
  const { name, url } = await request.json();
  
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const db = getDB();
  const newProject: Project = {
    id: crypto.randomUUID(),
    name,
    url,
    createdAt: new Date().toISOString(),
  };

  db.projects.push(newProject);
  saveDB(db);

  return NextResponse.json(newProject);
}
