import MeetingDetail from '@/components/MeetingDetail';
import { notFound } from 'next/navigation';

async function fetchMeeting(id: string) {
  const res = await fetch(`http://localhost:3000/api/meetings/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Error al cargar la reunión');
  return res.json();
}

export default async function SingleMeetingPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Extrae el id usando await
  const { id } = await params; 
  
  // Ahora sí, pasamos el id real a tu función fetchMeeting
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