import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FitLogProvider } from '@/context/FitLogContext';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description: 'Train with intent. Log every set.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />
          <div className="min-h-[calc(100vh-72px)]">{children}</div>
          <Footer />
          <Toaster theme="dark" position="bottom-right" />
        </FitLogProvider>
      </body>
    </html>
  );
}
