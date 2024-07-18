import { UploadedFile } from '@/types/file';
import db from '@/lib/db';

export const saveFile = async (file: UploadedFile) => {
  return db('uploads').insert(file).returning('*');
};

export const getFiles = async (is_private: boolean) => {
  if (is_private) {
    return db('uploads').select('*');
  } else {
    return db('uploads').select('*').where({ is_private: false });
  }
};

export const getFileById = async (id: number) => {
  return db('uploads').select('*').where({ id }).first();
};

export const updateFile = async (id: number, file: Partial<UploadedFile>) => {
  return db('uploads').update(file).where({ id }).returning('*');
};

export const deleteFile = async (id: number) => {
  return db('uploads').delete().where({ id });
};
