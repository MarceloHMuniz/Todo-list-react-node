import React, { createContext, useState, useContext } from "react";

interface AuthContextData {
  token: string | null;
  setToken: (token: string | null) => void;
  user: any; // Você pode usar a interface User aqui, se você tiver definido uma
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem("user") || "null"));

  const updateToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  const updateUser = (newUser: any) => {
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    setUser(newUser);
  };

  const logout = () => {
    updateToken(null);
    updateUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken, user, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
