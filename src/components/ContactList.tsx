// src/components/ContactList.tsx
import React from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Box,
} from '@mui/material';
import { type Contato } from './../types/types';

interface ContactListProps {
  contacts: Contato[];
  onContactSelect: (contact: Contato) => void;
  onFilterChange: (filter: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onContactSelect,
  onFilterChange,
}) => {
  return (
    <Box>
      <TextField
        label="Filtrar por nome..."
        variant="outlined"
        fullWidth
        onChange={(e) => onFilterChange(e.target.value)}
        sx={{ mb: 2 }}
      />
      <List component="nav">
        {contacts.map((contact) => (
          <ListItemButton
            key={contact.id}
            onClick={() => onContactSelect(contact)}
          >
            <ListItemText primary={contact.nome} secondary={contact.cpf} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ContactList;