import MeetingDetail from '@/components/MeetingDetail';
import { notFound } from 'next/navigation';

async function fetchMeeting(id: string) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/meetings/${id}`, { cache: 'no-store' });
  
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Error al cargar la reunión');
  return res.json();
}

export default async function SingleMeetingPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params; 
  
  const meeting = await fetchMeeting(id);

  if (!meeting) {
    notFound(); 
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <MeetingDetail meeting={meeting} />
    </div>
  );
}