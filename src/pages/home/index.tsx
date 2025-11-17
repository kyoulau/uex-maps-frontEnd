import React, { useState, useEffect } from 'react';
import {  Box } from '@mui/material';
import ContactList from '../../components/ContactList';
import MapDisplay from './../../components/MapDisplay';
import {type Contato } from './../../types/types';
import api from '../../api/api';

interface PageableResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export function Home(){

  const [contacts, setContacts] = useState<Contato[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contato | null>(null);

  const fetchContacts = async (filter: string = '') => {
    try {
      // O endpoint /contacts?nome=...
      const response = await api.get<PageableResponse<Contato>>(
        `/contacts?nome=${filter}`
      );
      setContacts(response.data.content);
    } catch (error) {
      console.error('Falha ao buscar contatos', error);
      // token expirado, forçao logout
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return(
    <Box sx={{ flexGrow: 1, p: 2, height: 'calc(100vh - 32px)' }}>

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
        <Box 
        sx={{ width: { xs: '100%', md: '30%' },height: '100%', 
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: '4px' }}
        >
          <ContactList
            contacts={contacts}
            onContactSelect={setSelectedContact}
            onFilterChange={fetchContacts}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '70%' }, height: '100%'  }}>
          <MapDisplay
            contacts={contacts}
            selectedContact={selectedContact}
          />
        </Box>
      </Box>
    </Box>
  )
}