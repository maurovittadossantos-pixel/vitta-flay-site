import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vita Fly Sites — AI website builder for growing businesses',
  description:
    'Describe your business, choose a look, and Vita Fly Sites generates a complete, responsive website you can publish in minutes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
