import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Container, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editUser/${id}`); // Navigate to the EditUser component
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <List>
        {users.map(user => (
          <ListItem key={user._id} divider>
            <ListItemText
              primary={user.UserName}
              secondary={`${user.Email} | ${user.Phone}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(user._id)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AllUsers;
