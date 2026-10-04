import { neon } from '@neondatabase/serverless';
import { SacramentMeeting, MeetingType, Hymn, WardBusinessItem, SpeakerItem } from './types';

const sql = neon(process.env.POSTGRES_URL!);

const ITEMS_PER_PAGE = 4; 

export async function getMeetings(query: string = '', currentPage: number = 1) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {
    const meetings = await sql`
      SELECT * FROM meetings
      WHERE presiding ILIKE ${`%${query}%`} 
         OR conducting ILIKE ${`%${query}%`}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    
    return meetings.map((row) => mapMeeting(row as DBMeetingRow)) as SacramentMeeting[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch meetings data.');
  }
}

export async function getMeetingsPages(query: string = '') {
  try {
    const data = await sql`
      SELECT COUNT(*) 
      FROM meetings
      WHERE presiding ILIKE ${`%${query}%`} 
         OR conducting ILIKE ${`%${query}%`}
    `;
    
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of meetings.');
  }
}

export async function getMeetingById(id: number | string) {
  try {
    const data = await sql`
      SELECT * FROM meetings
      WHERE id = ${id}
    `;
    
    if (data.length === 0) return null;

    // Mapeamos la única fila encontrada
    return mapMeeting(data[0] as DBMeetingRow) as SacramentMeeting;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch meeting by ID.');
  }
}


interface DBMeetingRow {
  id: number;
  date: Date | string;
  meeting_type: MeetingType; 
  presiding: string;
  conducting: string;
  announcements?: string[];
  opening_hymn: Hymn;
  opening_prayer: string;
  ward_business: WardBusinessItem[];
  stake_business: boolean;
  sacrament_hymn: Hymn;
  speakers: SpeakerItem[];
  closing_hymn: Hymn;
  closing_prayer: string;
}

function mapMeeting(row: DBMeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: typeof row.date === 'object' ? row.date.toISOString().split('T')[0] : row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements,
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business,
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers,
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}