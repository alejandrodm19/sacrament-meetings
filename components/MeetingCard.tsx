import type { SacramentMeeting } from '@/lib/types'; 
import Link from 'next/link';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800">
          {new Date(meeting.date).toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
          })}
        </h3>
        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full capitalize">
          {meeting.meetingType}
        </span>
      </div>
      
      <div className="space-y-1 text-sm text-slate-600 mb-6">
        <p><span className="font-semibold text-slate-700">Presiding:</span> {meeting.presiding}</p>
        <p><span className="font-semibold text-slate-700">Conducting:</span> {meeting.conducting}</p>
      </div>

      <Link 
        href={`/meetings/${meeting.id}`}
        className="inline-block bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded hover:bg-slate-700 transition-colors"
      >
        View Agenda
      </Link>
    </div>
  );
}