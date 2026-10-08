import { getMeetings, getMeetingsPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';
import SignOutButton from '@/components/SignOutButton';

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsPages(query),
  ]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Contenedor flexible para el título y el botón de cerrar sesión */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sacrament Meetings</h1>
        <SignOutButton />
      </div>
      
      <MeetingSearch />
      
      <div className="flex flex-col gap-4">
        {meetings.length > 0 ? (
          meetings.map((m) => (
            <MeetingCard key={m.id} meeting={m} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No meetings found.</p>
        )}
      </div>
      
      {totalPages > 0 && <Pagination totalPages={totalPages} />}
    </div>
  );
}