import React from "react";
import { AuthProvider } from "../src/context/authContext";
import { AppRoutes } from "./routes/appRoutes";
import { Home } from "@mui/icons-material";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Home/>
    <AppRoutes/>
    </AuthProvider>
  );
};
