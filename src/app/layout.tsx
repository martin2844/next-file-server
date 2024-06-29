import type { Metadata } from 'next';
import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { NextUIProvider } from '@nextui-org/react';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'File Server',
  description: 'A Nextjs and SQLite File Server',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className="dark text-foreground bg-background w-full"
        style={{ minHeight: '100vh' }}
      >
        <NextUIProvider>
          <Navbar loggedin={!!session?.user?.name} />
          <main
            style={{ minHeight: '100%' }}
            className="flex flex-col w-full h-full items-center justify-center pb-8"
          >
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
