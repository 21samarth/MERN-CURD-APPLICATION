import React, { useState } from 'react';
import { FormGroup, FormControl, Input, InputLabel, Typography, Button, styled } from '@mui/material';

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

const initialUserState = {
  UserName: '',
  Email: '',
  Phone: '',
  Suggestion: ''
};

const AddUser = () => {
  const [user, setUser] = useState(initialUserState);
  const [error, setError] = useState('');

  const getFormValues = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const getDetails = async () => {
    if (!user.UserName || !user.Email || !user.Phone || !user.Suggestion) {
      setError('All fields are required.');
      return;
    }
    setError('');

    try {
      const response = await fetch('http://localhost:8080/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User added:", data);
        setUser(initialUserState); // Clear form after submission
      } else {
        console.error("Error:", response.statusText);
        setError("Failed to add user");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to connect to the server");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Add New User</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <FormControl fullWidth>
        <InputLabel>UserName</InputLabel>
        <Input onChange={getFormValues} name="UserName" value={user.UserName} />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Email</InputLabel>
        <Input onChange={getFormValues} name="Email" value={user.Email} />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Phone</InputLabel>
        <Input onChange={getFormValues} name="Phone" value={user.Phone} />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Suggestion</InputLabel>
        <Input onChange={getFormValues} name="Suggestion" value={user.Suggestion} />
      </FormControl>
      <Btn variant="contained" onClick={getDetails}>Add User</Btn>
    </Container>
  );
};

export default AddUser;
