import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Meetings',
  description: 'Browse, search, and manage all scheduled sacrament meetings for the ward.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}