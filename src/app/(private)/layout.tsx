import { redirectIfNotAuthenticated } from '@/utils/session';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  redirectIfNotAuthenticated();
  return <>{children}</>;
}
