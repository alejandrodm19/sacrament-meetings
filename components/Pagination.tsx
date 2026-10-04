'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center gap-4 mt-8">
      {currentPage > 1 ? (
        <Link href={createPageURL(currentPage - 1)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 text-gray-400 bg-gray-100 rounded cursor-not-allowed">Previous</span>
      )}
      
      <span className="font-medium">Page {currentPage} of {totalPages}</span>
      
      {currentPage < totalPages ? (
        <Link href={createPageURL(currentPage + 1)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 text-gray-400 bg-gray-100 rounded cursor-not-allowed">Next</span>
      )}
    </nav>
  );
}