import fs from 'fs';
import path from 'path';

const uploadsFolderPath = process.env.UPLOADS_FOLDER || 'uploads';
const userUploads = uploadsFolderPath + '/user';

const checkFolder = (folderPath: string): boolean => {
  if (!folderPath) throw Error('folder path is required');
  return fs.existsSync(folderPath);
};

export const createUploadFolder = (): string => {
  if (!checkFolder(uploadsFolderPath)) {
    fs.mkdirSync(uploadsFolderPath, {
      recursive: true,
    });
    fs.mkdirSync(userUploads, {
      recursive: true,
    });
  }
  return uploadsFolderPath;
};

const fileExists = (filePath: string): boolean => {
  if (!filePath) throw Error('file path is required');
  return fs.existsSync(filePath);
};

export const getUniqueFilename = (filePath: string): string => {
  if (!fileExists(filePath)) return filePath;
  let baseName = path.basename(filePath, path.extname(filePath));
  let fileExtension = path.extname(filePath);
  let counter = 1;

  while (fileExists(filePath)) {
    filePath = path.format({
      dir: path.dirname(filePath),
      base: `${baseName}-${counter}${fileExtension}`,
    });
    counter++;
  }
  return filePath;
};

export const getFileNameFromPath = (filePath: string): string => {
  return path.basename(filePath);
};
