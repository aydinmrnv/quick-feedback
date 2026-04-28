import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const { projectId, rating, comment, url } = await request.json();

  if (!projectId || !rating) {
    return NextResponse.json({ error: 'Project ID and rating are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('feedbacks')
    .insert([{ projectId, rating, comment, url }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
