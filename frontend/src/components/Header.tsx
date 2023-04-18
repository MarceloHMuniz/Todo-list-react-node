import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { token, setToken, setUser } = useAuth();

  const handleLogout = () => {
    setToken(null);
    setUser(null)
    navigate("/login")
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Todo List
        </Typography>
        {token && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};