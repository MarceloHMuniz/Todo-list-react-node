import axios from "axios";
import { useAuth } from "../context/authContext";

export const loginUser = async (
  username: string,
  password: string,
  setToken: (token: string) => void,
  setUser: (user: string) => void
) => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
    username,
    password,
  });
  console.log(response);

  if (response.data) {
    setToken(response.data.accessToken);
    setUser(response.data.newUser.username); 
    return response.data;
  } else {
    throw new Error("Erro ao fazer login");
  }
};

export const registerUser = async (
  name: string,
  lastName: string,
  password: string,
  email: string
) => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user`, {
    name,
    last_name: lastName,
    password,
    email
  });

  if (response.status !== 201) {
    throw new Error("Erro ao criar conta.");
  }
};

