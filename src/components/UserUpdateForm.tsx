import React, { useContext, useState } from 'react';
import { TextField, Button, Box, Modal, Container } from '@mui/material';
import { User } from '../types/user';
import { Reducer, url } from './AppLayout';
import axios from 'axios';

export default () => {
  const { user, userDispatch } = useContext(Reducer);
  const [updateForm, openUpdateForm] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    userDispatch({
      type: 'Update',
      data: updatedUser,
    });
    try {
      console.log('Sending update request with user ID:', user.id);
      const res = await axios.put(url + '/', {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phoneNumber
      }, {
        headers: {
          'user-id': user.id // Replace with the actual user ID
        }
      });
    }
    catch (e) {
      console.error(e);
      setError("An error occurred while updating user.");
      alert(e);
    }
    finally {
      openUpdateForm(false);
      setError('');
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={1}>
          <Button fullWidth color="primary" variant="contained" onClick={() => openUpdateForm(true)}>Update</Button>
        </Box>
      </Container>
      <Modal open={updateForm}>
        <Box sx={{ width: 300, padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
          <form action="" onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              value={updatedUser.firstName}
              name="firstName"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={updatedUser.lastName}
              name="lastName"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              value={updatedUser.email}
              name="email"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={updatedUser.password}
              name="password"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Address"
              value={updatedUser.address}
              name="address"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone Number"
              value={updatedUser.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              fullWidth
            />
            <Button type='submit' variant="contained" sx={{ marginTop: 2 }}>
              Save Changes
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

