import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; 
import Header from '@/components/Header';
import Footer from '@/components/Footer'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Application to plan and manage sacrament meetings.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 3. Aplica la clase de la fuente en la etiqueta body */}
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <Header />
        <main className="grow max-w-5xl mx-auto w-full p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}