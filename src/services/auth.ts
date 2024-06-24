import axios from 'axios';
const login = async (password: string) => {
  return axios.post(
    `${process.env.NEXTAUTH_URL}/api/login`,
    {
      password: password,
    },
    {
      withCredentials: true,
    },
  );
};

export { login };
