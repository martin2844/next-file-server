import axios from "axios";
const login = async (password: string) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/login`,
    {
      password: password,
    },
    {
      withCredentials: true,
    }
  );
};

const checkLogin = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    withCredentials: true,
  });
};

export { login, checkLogin };
