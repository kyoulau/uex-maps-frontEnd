import React, { useState, useEffect } from 'react';

import api from '../../api/api';

import ContactFormModal from '../../components/contact/ContactFormModal';
import ContactList from '../../components/ContactList';
import MapDisplay from '../../components/MapDisplay';

import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

import {type Contato } from './../../types/types';

import DeleteIcon from '@mui/icons-material/Delete';
import DeleteAccountModal from '../../components/DeleteAccountModal';


interface PageableResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export function Home(){

  const [contacts, setContacts] = useState<Contato[]>([]);
  const [editingContact, setEditingContact] = useState<Contato | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contato | null>(null);

  const navigate = useNavigate();

  const fetchContacts = async (filter: string = '') => {
    try {
      const response = await api.get<PageableResponse<Contato>>(
        `/contacts?nome=${filter}`
      );
      setContacts(response.data.content);
    } catch (error) {
      console.error('Falha ao buscar contatos', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (contact: Contato) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleSaveSuccess = () => {
    handleCloseModal();
    fetchContacts(); 
  };

  const handleDeleteContact = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este contato?')) {
        try {
            await api.delete(`/contacts/${id}`);
            fetchContacts();
        } catch (error) {
            console.error('Falha ao deletar contato', error);
        }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  return(
    <Box sx={{ flexGrow: 1, p: 2, height: 'calc(100vh - 32px)' }}>

      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          flexDirection: { xs: 'column', md: 'row' }, 
          height: '100%' 
        }}>
        <Box 
          sx={{ 
            width: { xs: '100%', md: '30%' },
            height: '100%', 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ddd',
            borderRadius: '4px' 
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateModal}
            sx={{ mb: 2 }}
          >
            Adicionar Contato
          </Button>
          <ContactList
            contacts={contacts}
            onContactSelect={setSelectedContact} // <-- 1. O Pai passa o "setter" para a Lista
            onFilterChange={fetchContacts}
            onEdit={handleOpenEditModal}  
            onDelete={handleDeleteContact}
          />
          <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{ minWidth: 'auto', px: 1 }}
              title="Sair"
            >
              <LogoutIcon />
            </Button>
            <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setIsDeleteModalOpen(true)}
            sx={{ mt: 2, pt: 1, borderTop: '1px solid #eee' }} // Fica na parte de baixo
          >
            Excluir Minha Conta
          </Button>
        </Box>


        <Box 
          sx={{ width: { xs: '100%', md: '70%' }, 
          height: '100%'  }}
        >
          <MapDisplay
            contacts={contacts}
            selectedContact={selectedContact} // <-- 2. O Pai passa o "estado" para o Mapa
          />
        </Box>
      </Box>
      <ContactFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSuccess}
        contactToEdit={editingContact}
      />
      <DeleteAccountModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </Box>
  )
}