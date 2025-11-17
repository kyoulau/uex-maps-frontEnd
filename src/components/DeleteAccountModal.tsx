// src/components/DeleteAccountModal.tsx
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, CircularProgress, Alert, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteModalProps> = ({ open, onClose }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.delete('/user/me', {
        data: { senha: password },
      });

      localStorage.removeItem('jwtToken');
      onClose();
      navigate('/login');

    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Senha inválida ou erro no servidor.");
      } else {
        setError("Erro de conexão.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <Box component="form" onSubmit={handleDelete}>
        <DialogTitle sx={{ color: 'error.main' }}>
          Excluir Conta Permanentemente
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Esta ação é irreversível. Todos os seus contatos serão
            permanentemente excluídos. Para confirmar, digite sua senha.
          </Typography>

          {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

          <TextField
            label="Digite sua senha"
            type="password"
            variant="outlined"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit" disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="error" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Excluir Minha Conta'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteAccountModal;