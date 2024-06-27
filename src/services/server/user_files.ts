import db from '@/lib/db';
import { randomUUID } from 'crypto';

export const createBlankFile = async () => {
  return db('user_files')
    .insert({ id: randomUUID().toString() })
    .returning('*');
};
