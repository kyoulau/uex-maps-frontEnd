import React, { useState } from "react"
import { useNavigate,  Link as RouterLink } from "react-router-dom"
import { Container, Box, TextField, Button, Typography } from "@mui/material"
import api from "../../../api/api"
import { type JwtResponse } from "../../../types/types"
import { Link } from "@mui/material"

export function LoginPage(){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post<JwtResponse>('/auth/login', {
        email,
        senha,
      });
      localStorage.setItem('jwtToken', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };

  return(
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          required
          fullWidth
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Entrar
        </Button>
      </Box>
      <Link component={RouterLink} to="/register" variant="body2">
          {"Não tem uma conta? Faça registro"}
        </Link>
    </Container>
  )
}