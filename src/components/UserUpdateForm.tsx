import React, { useContext, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { User } from './user';
import { UpdateForm } from './UserAvatar';
import { Reducer, url } from './appLayout';
import axios from 'axios';

const UserUpdateForm = () => {
  const { user, userDispatch } = useContext(Reducer);
  const { updateForm, openUpdateForm } = useContext(UpdateForm);
  const [updatedUser, setUpdatedUser] = useState<User>({} as User);
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
      {updateForm &&
        <Box width={{ width: 400 }} sx={{ padding: 2, justifyContent: "center" }}>
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
      }
    </>
  );
};

export default UserUpdateForm