import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Validamos directamente contra el usuario quemado
        const expectedEmail = "bishopric@ward.org";
        const expectedPassword = "sacrament123"; 

        if (email === expectedEmail && password === expectedPassword) {
          return { id: "1", name: "Bishopric", email: expectedEmail };
        }

        return null;
      },
    }),
  ],
});