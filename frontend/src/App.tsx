import React from "react";
import { AuthProvider } from "../src/context/authContext";
import { AppRoutes } from "./routes/appRoutes";

export const App: React.FC = () => {
  return (
    <AuthProvider>
    <AppRoutes/>
    </AuthProvider>
  );
};
