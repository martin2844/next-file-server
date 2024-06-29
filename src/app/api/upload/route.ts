import { NextRequest } from 'next/server';
import {
  createUploadFolder,
  getUniqueFilename,
  getFileNameFromPath,
} from '@/lib/fileUtils';
import path from 'path';
import { writeFile } from 'fs/promises';
import { UploadedFile, UserFile } from '@/types/file';
import { getBlankFile, updateUserFile } from '@/services/server/user_files';
import { saveFile } from '@/services/server/files';
import { apiResponse } from '@/utils/apiResponse';
import { checkSession } from '@/utils/auth';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  const isPrivateField = formData.get('is_private');
  const userUploadId = formData.get('user_upload_id');
  const user_name = formData.get('user_name');
  // Extract the IP address from the request
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ipAddress = forwardedFor
    ? forwardedFor.split(',')[0]
    : req.headers.get('x-real-ip') || req.headers.get('host');

  const allowed = await checkSession(req);

  if (!allowed && !userUploadId) {
    return apiResponse(401, { message: 'Unauthorized' });
  }

  if (userUploadId) {
    const file = await getBlankFile(userUploadId as string);
    if (!file) {
      return apiResponse(404, {
        message: 'User upload not found or incorrectly setup',
      });
    }
  }

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
    const finalPath = userUploadId
      ? path.join(uploadsPath, '/user')
      : uploadsPath;
    let filePath = path.join(finalPath, filename);
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
    if (userUploadId) {
      const id = userUploadId.toString();
      const userFile: UserFile = {
        ...uploadedFile,
        id,
        user_name: user_name?.toString() || 'Unknown',
        user_ip: ipAddress || 'Unknown',
        user_agent: req.headers.get('user-agent') || 'Unknown',
      };
      const updatedUserFile = updateUserFile(userFile);
      return apiResponse(200, {
        message: 'File uploaded successfully.',
        file: updatedUserFile,
      });
    }
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
