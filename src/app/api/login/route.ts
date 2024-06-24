import { apiResponse } from '@/utils/apiResponse';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password !== process.env.JWT_PASSWORD) {
    return apiResponse(401, { message: 'Unauthorized' });
  }
  const token = jwt.sign(
    { user: 'admin' },
    process.env.JWT_PASSWORD as string,
    {
      expiresIn: '127h',
    },
  );
  return apiResponse(200, { token });
}
