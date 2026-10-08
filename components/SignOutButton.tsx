'use client';

import { logOut } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await logOut();
    
    router.push('/login');
    router.refresh(); 
  };

  return (
    <button 
      onClick={handleSignOut}
      className="text-sm bg-red-100 text-red-700 px-4 py-2 rounded font-medium hover:bg-red-200 transition-colors"
    >
      Sign Out
    </button>
  );
}