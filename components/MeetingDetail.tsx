import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const dateStr = new Date(meeting.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      
      {/* Encabezado de la tarjeta */}
      <div className="bg-slate-50 border-b border-slate-200 p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Sacrament Meeting</h2>
        <p className="text-slate-600 font-medium mt-1">{dateStr}</p>
        <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider rounded-full">
          {meeting.meetingType}
        </span>
      </div>

      {/* Cuerpo de la agenda */}
      <div className="p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><span className="font-semibold text-slate-900">Presiding:</span> {meeting.presiding}</div>
          <div><span className="font-semibold text-slate-900">Conducting:</span> {meeting.conducting}</div>
        </div>

        <hr className="border-slate-100" />

        {/* Anuncios */}
        {meeting.announcements && meeting.announcements.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Announcements</h3>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              {meeting.announcements.map((announcement, idx) => (
                <li key={idx}>{announcement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Apertura */}
        <div className="space-y-2 text-sm text-slate-700">
          <p><span className="font-semibold text-slate-900">Opening Hymn:</span> #{meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
          <p><span className="font-semibold text-slate-900">Opening Prayer:</span> {meeting.openingPrayer}</p>
        </div>

        <hr className="border-slate-100" />

        {/* Asuntos del Barrio */}
        {meeting.wardBusiness && meeting.wardBusiness.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-slate-900 mb-2">Ward Business</h3>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              {meeting.wardBusiness.map((business, idx) => (
                <li key={idx}>{business.description}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Santa Cena */}
        <div className="text-sm text-slate-700 text-center py-4 bg-slate-50 rounded-lg border border-slate-100">
          <p className="font-semibold text-slate-900 mb-1">Administration of the Sacrament</p>
          <p>Hymn #{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
        </div>

        <hr className="border-slate-100" />

        {/* Discursantes */}
        {meeting.speakers && meeting.speakers.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Speakers & Musical Numbers</h3>
            <div className="space-y-4">
              {meeting.speakers.map((speaker, idx) => (
                <div key={idx} className="text-sm">
                  <p className="font-semibold text-slate-800">{speaker.name}</p>
                  <p className="text-slate-600 capitalize">
                    {speaker.type === 'musical-number' ? 'Musical Number' : `Topic: ${speaker.topic}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <hr className="border-slate-100" />

        {/* Cierre */}
        <div className="space-y-2 text-sm text-slate-700">
          <p><span className="font-semibold text-slate-900">Closing Hymn:</span> #{meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
          <p><span className="font-semibold text-slate-900">Closing Prayer:</span> {meeting.closingPrayer}</p>
        </div>

      </div>
    </div>
  );
}