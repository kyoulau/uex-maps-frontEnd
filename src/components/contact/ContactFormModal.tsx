// src/components/ContactFormModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  // Grid,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import api from '../../api/api';
import { type Contato, type ContatoRequest, type ViaCepResponse } from '../../types/types';
import { GridLegacy as Grid } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  contactToEdit: Contato | null;
}

const initialState: ContatoRequest = {
  nome: '',
  cpf: '',
  telefone: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cidade: '',
  uf: '',
  cep: '',
  complemento: '',
};

const ContactFormModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onSave,
  contactToEdit,
}) => {
  const [formData, setFormData] = useState<ContatoRequest>(initialState);
  const [loading, setLoading] = useState(false);
  const [viaCepLoading, setViaCepLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        nome: contactToEdit.nome,
        cpf: contactToEdit.cpf,
        telefone: contactToEdit.telefone,
        logradouro: contactToEdit.logradouro,
        numero: contactToEdit.numero,
        bairro: contactToEdit.bairro,
        cidade: contactToEdit.cidade,
        uf: contactToEdit.uf,
        cep: contactToEdit.cep,
        complemento: contactToEdit.complemento || '',
      });
    } else {
      setFormData(initialState);
    }
    setError(null); 
  }, [contactToEdit, open]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleViaCepSearch = async () => {
    if (!formData.uf || !formData.cidade || !formData.logradouro) {
      setError('Preencha UF, Cidade e Logradouro para buscar o CEP.');
      return;
    }
    setViaCepLoading(true);
    setError(null);
    try {
      const response = await api.get<ViaCepResponse[]>(
        `/address/search`, {
          params: {
            uf: formData.uf,
            cidade: formData.cidade,
            logradouro: formData.logradouro
          }
        }
      );
      
      if (response.data && response.data.length > 0) {
        const address = response.data[0]; 
        setFormData((prev) => ({
          ...prev,
          cep: address.cep,
          bairro: address.bairro,
        }));
      } else {
        setError('Endereço não encontrado pelo ViaCep.');
      }
    } catch (err) {
      setError('Erro ao buscar endereço.');
    } finally {
      setViaCepLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (contactToEdit) {
        await api.put(`/contacts/${contactToEdit.id}`, formData);
      } else {
        await api.post('/contacts', formData);
      }
      onSave(); 
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Erro ao salvar contato.');
      } else {
        setError('Erro de conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {contactToEdit ? 'Editar Contato' : 'Adicionar Novo Contato'}
      </DialogTitle>
      
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Grid className='p-4' container spacing={2}>
            <Grid className='p-4' xs={12} sm={6}>
              <TextField name="nome" label="Nome" value={formData.nome} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid className='p-4' xs={12} sm={6}>
              <TextField className='text-amber-800' name="cpf" label="CPF" value={formData.cpf} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid className='p-4' xs={12} sm={6}>
              <TextField className='text-amber-800' name="telefone" label="Telefone" value={formData.telefone} onChange={handleChange} fullWidth required />
            </Grid>

            <Grid className='p-4' xs={12} sm={2}>
              <TextField className='text-amber-800' name="uf" label="UF" value={formData.uf} onChange={handleChange} fullWidth helperText=" " />
            </Grid>
            <Grid className='p-4' xs={12} sm={5}>
              <TextField className='text-amber-800' name="cidade" label="Cidade" value={formData.cidade} onChange={handleChange} fullWidth helperText=" " />
            </Grid>
            <Grid className='p-4' xs={12} sm={5}>
              <TextField className='text-amber-800' name="logradouro" label="Logradouro" value={formData.logradouro} onChange={handleChange} fullWidth helperText=" " />
            </Grid>
            
            <Grid className='p-4' xs={12} sm={4}>
                <Button 
                    onClick={handleViaCepSearch} 
                    variant="outlined" 
                    fullWidth 
                    disabled={viaCepLoading}
                    sx={{ height: '56px' }}
                >
                    {viaCepLoading ? <CircularProgress size={24} /> : 'Buscar Endereço'}
                </Button>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField name="cep" label="CEP" value={formData.cep} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField name="bairro" label="Bairro" value={formData.bairro} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField name="numero" label="Número" value={formData.numero} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField name="complemento" label="Complemento" value={formData.complemento} onChange={handleChange} fullWidth />
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit" disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Salvar'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ContactFormModal;