import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedArea = nextUrl.pathname.startsWith('/meetings');
      
      if (isOnProtectedArea) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/meetings', nextUrl));
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;