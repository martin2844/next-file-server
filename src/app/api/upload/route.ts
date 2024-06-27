import { NextRequest } from 'next/server';
import {
  createUploadFolder,
  getUniqueFilename,
  getFileNameFromPath,
} from '@/lib/fileUtils';
import path from 'path';
import { writeFile } from 'fs/promises';
import { UploadedFile } from '@/types/file';
import { saveFile } from '@/services/server/files';
import { apiResponse } from '@/utils/apiResponse';
import { checkSession } from '@/utils/auth';

export async function POST(req: NextRequest) {
  const userUpload = req.headers.get('user-upload');
  console.log('User upload header: ', userUpload);
  const allowed = await checkSession(req);
  if (!allowed) {
    return apiResponse(401, { message: 'Unauthorized' });
  }
  const formData = await req.formData();
  const file = formData.get('file');
  const isPrivateField = formData.get('is_private');

  if (!file) {
    return apiResponse(400, { error: 'No files received.' });
  }

  const buffer = Buffer.from(await (file as any).arrayBuffer());
  const filename = (file as any).name.replaceAll(' ', '_');
  const fileType = (file as any)?.type;
  const fileExtension = path.extname(filename);
  const isPrivate = isPrivateField ? isPrivateField === 'true' : false;
  try {
    const uploadsPath = createUploadFolder();
    let filePath = path.join(uploadsPath, filename);
    filePath = getUniqueFilename(filePath);
    await writeFile(filePath, buffer);
    // Construct the UploadedFile data
    const uploadedFile: UploadedFile = {
      file_name: getFileNameFromPath(filePath),
      file_type: fileType,
      file_extension: fileExtension,
      file_url: filePath, // or the URL if served publicly
      is_private: isPrivate, // set based on your application logic
      file_size: buffer.byteLength,
    };
    const savedFile = await saveFile(uploadedFile);
    return apiResponse(200, {
      message: 'File uploaded successfully.',
      file: savedFile[0],
    });
  } catch (error) {
    console.log('Error occurred: ', error);
    return apiResponse(500, {
      message: 'Error uploading file.',
      err: error?.toString(),
    });
  }
}
