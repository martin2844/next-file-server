import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function redirectIfNotAuthenticated() {
  const session = await getSession();
  if (!session) {
    redirect('/api/auth/signin');
  }
}
