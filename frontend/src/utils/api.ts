import axios from "axios";

export const loginUser = async (
  username: string,
  password: string,
  setToken: (token: string) => void
) => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
    username,
    password,
  });
  console.log(response);

  if (response.data) {
    setToken(response.data.accessToken);
    return response.data;
  } else {
    throw new Error("Erro ao fazer login");
  }
};
