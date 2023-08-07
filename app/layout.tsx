import DesktopSidebar from '@/components/DesktopSidebar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import { ReduxProvider } from '../store/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kwil Admin',
  description: 'Kwil Admin is a web-based admin tool for Kwil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <Sidebar />
          <DesktopSidebar />

          <main className="py-6 lg:pl-72">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
