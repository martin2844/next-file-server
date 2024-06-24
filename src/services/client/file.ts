import axios from 'axios';
import type { UploadedFile } from '@/types/file';
const updateFile = async (id: number, file: Partial<UploadedFile>) => {
  const updateReq = await axios.put(`/api/file/${id}}`, {
    ...file,
  });
  return updateReq.data;
};

export { updateFile };
