// src/components/ContactList.tsx
import React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Box,
  IconButton,
  ListItemIcon
} from '@mui/material';

import { type Contato } from './../types/types';


interface ContactListProps {
  contacts: Contato[];
  onContactSelect: (contact: Contato) => void;
  onFilterChange: (filter: string) => void;
  onEdit: (contact: Contato) => void;    
  onDelete: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onContactSelect,
  onFilterChange,
  onEdit,
  onDelete
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
      <List component="nav" sx={{width: '100%'}}>
        {contacts.map((contact) => (
          <ListItemButton
            key={contact.id}
            onClick={() => onContactSelect(contact)}
            divider
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>

            <ListItemText primary={contact.nome} secondary={contact.cpf} />
            <Box sx={{ display: 'flex' }}>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(contact);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(contact.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ContactList;