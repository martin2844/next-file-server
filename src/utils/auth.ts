import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export async function checkSession(req: NextRequest): Promise<boolean> {
  //Disable authentication in development mode
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  const session = await getServerSession({ req, ...authOptions });
  if (!session || !session.user || !session.user.token) {
    return false;
  }
  return true;
}
