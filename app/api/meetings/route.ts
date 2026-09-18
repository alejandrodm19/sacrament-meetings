import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');

  let meetings = await getMeetings();

  if (dateParam) {
    meetings = meetings.filter(m => m.date === dateParam);
  }

  return NextResponse.json(meetings);
}