import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

// Función para obtener los datos desde tu API 
async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/meetings`, { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch meetings data');
  }
  
  return res.json();
}

export default async function MeetingsList() {
  const meetings = await fetchMeetings();
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 border-b pb-4">
        All Meetings
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}