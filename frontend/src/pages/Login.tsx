import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { loginUser } from "../utils/api";
import { useAuth } from "../context/authContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(username, password, setToken);
      console.log();
      
      navigate("/home");
    } catch (err: any) {
      setError("Erro ao fazer login. Verifique sua conexão e tente novamente.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Usuário"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Entrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
