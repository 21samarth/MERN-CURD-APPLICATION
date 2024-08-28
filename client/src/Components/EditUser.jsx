import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormGroup, FormControl, Input, InputLabel, Typography, Button, styled } from '@mui/material';
import axios from 'axios';

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto;
  & > div {
    margin-top: 2%;
  }
`;

const Btn = styled(Button)`
  width: 30%;
  margin: 5% auto;
`;

const EditUser = () => {
  const [user, setUser] = useState({
    UserName: '',
    Email: '',
    Phone: '',
    Suggestion: ''
  });

  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  
  const fetchUserDetails = async () => {
      try {
          const response = await axios.get(`http://localhost:8080/users/${id}`);
          setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data', error);
        }
    };
    
useEffect(() => {
      fetchUserDetails();
});
const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
};

const updateUserDetails = async () => {
    try {
      await axios.put(`http://localhost:8080/users/${id}`, user);
      navigate('/users'); // Navigate back to the user list after update
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Edit User</Typography>
      <FormControl fullWidth>
        <InputLabel>UserName</InputLabel>
        <Input onChange={onValueChange} name="UserName" value={user.UserName} />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Email</InputLabel>
        <Input onChange={onValueChange} name="Email" value={user.Email} />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Phone</InputLabel>
        <Input onChange={onValueChange} name="Phone" value={user.Phone} />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Suggestion</InputLabel>
        <Input onChange={onValueChange} name="Suggestion" value={user.Suggestion} />
      </FormControl>
      <Btn variant="contained" onClick={updateUserDetails}>
        Update User
      </Btn>
    </Container>
  );
};

export default EditUser;
