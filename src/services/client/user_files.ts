import axios from 'axios';

export const createBlankFile = async () => {
  const createReq = await axios.post('/api/create');
  return createReq.data;
};
