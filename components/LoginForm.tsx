'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          id="email" 
          type="email" 
          name="email" 
          required 
          defaultValue="bishopric@ward.org"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input 
          id="password" 
          type="password" 
          name="password" 
          minLength={6} 
          required 
          defaultValue="sacrament123"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <button 
        aria-disabled={isPending} 
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
      {errorMessage && (
        <p className="text-red-500 text-sm font-medium mt-2" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}