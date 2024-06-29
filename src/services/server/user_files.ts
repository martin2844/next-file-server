import db from '@/lib/db';
import { randomUUID } from 'crypto';
import { UserFile } from '@/types/file';

export const createBlankFile = async () => {
  return db('user_files')
    .insert({ id: randomUUID().toString() })
    .returning('*');
};

export const updateUserFile = async (file: Partial<UserFile>) => {
  return db('user_files').update(file).where({ id: file.id }).returning('*');
};

export const getUserFiles = async () => {
  return db('user_files').select('*').whereNotNull('file_url');
};

export const getBlankFile = async (id: string) => {
  const userFile = await db('user_files').select('*').where({ id }).first();
  if (userFile?.file_url) {
    return false;
  }
  if (!userFile?.id) {
    return false;
  }
  return userFile;
};
