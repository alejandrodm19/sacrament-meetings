import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db'; 

export default async function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Domingo) a 6 (Sábado)
  
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); // Retrocedemos al domingo
  
  // Formateamos la fecha a YYYY-MM-DD
  const isoDate = sunday.toISOString().split('T')[0];

  // Buscamos si hay una reunión en esa fecha
  const meetings = await getMeetings();
  const currentMeeting = meetings.find((m) => m.date === isoDate);

  if (currentMeeting) {
    redirect(`/meetings/${currentMeeting.id}`);
  } else {
    // Fallback razonable si no hay reunión ese domingo
    redirect('/meetings');
  }
}