import { apiResponse } from '@/utils/apiResponse';
import { getSession } from '@/utils/session';
import type { UserFile } from '@/types/file';
import { createBlankFile } from '@/services/server/user_files';

export async function POST() {
  const session = await getSession();
  if (!session) {
    return apiResponse(401, { message: 'Unauthorized' });
  }
  const file: UserFile[] = await createBlankFile();
  return apiResponse(200, {
    message: 'File created successfully.',
    data: file[0].id,
  });
}
