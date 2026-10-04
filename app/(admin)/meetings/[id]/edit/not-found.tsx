import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h2 className="text-2xl font-bold">Meeting Not Found</h2>
      <p className="text-gray-500">Could not find the requested sacrament meeting.</p>
      <Link 
        href="/meetings" 
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Return to Meetings
      </Link>
    </div>
  );
}