import { Inter } from 'next/font/google';
import './globals.css'; 
import Header from '@/components/Header';
import Footer from '@/components/Footer'; 
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Sacrament Meeting Planner',
    default: 'Sacrament Meeting Planner',
  },
  description: 'A comprehensive tool for bishoprics to plan, manage, and organize sacrament meetings.',
  openGraph: {
    title: 'Sacrament Meeting Planner',
    description: 'A comprehensive tool for bishoprics to plan, manage, and organize sacrament meetings.',
    siteName: 'Sacrament Meeting Planner',
    images: [
      {
        url: '/hero.jpg', 
        width: 1200,
        height: 630,
        alt: 'Sacrament Meeting Planner Hero Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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