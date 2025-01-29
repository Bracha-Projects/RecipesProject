import React, { createContext, FormEvent, useContext, useRef, useState } from 'react';
import axios, { AxiosError } from "axios"
import { Modal, Box, TextField, Button } from '@mui/material';
import { IsLoggedIn } from './HomePage';
import LetterAvatars from './UserAvatar';
import { Reducer, url } from './AppLayout';

export default ({ state, Close, showModal }: { state: boolean, Close: () => void,showModal:boolean }) => {
  const { user, userDispatch } = useContext(Reducer);
  const { LoggedIn, setLoggedIn } = useContext(IsLoggedIn);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Email:", emailRef.current?.value);
    console.log("Password:", passwordRef.current?.value);
    try {
      const str = url + '/' + (state === true ? 'login' : 'register');
      const res = await axios.post(
        str,
        {
          email: emailRef.current?.value,
          password: passwordRef.current?.value
        },
      )
      if (res.data.user)
        userDispatch({
          type: 'Login',
          data: res.data.user
        });
      else {
        userDispatch({
          type: 'Login',
          data:
          {
            id: +res.data.userId,
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
          }
        });
      }
    }
    catch (error) {
      setLoggedIn(false);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data); // Log the error response for debugging
        alert("An error occurred: " + error.response?.data.message || "An unknown error occurred.");
    } else {
        console.error(error);
        alert("An unexpected error occurred.");
    }
    }
    finally {
      emailRef.current!.value = ''
      passwordRef.current!.value = ''
      Close();
    }
  }
  return (
    <>
      <Modal open={showModal} >
        <Box sx={{ width: 300, padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" type="email" fullWidth inputRef={emailRef} />
            <TextField label="Password" type="password" fullWidth inputRef={passwordRef} />
            <Button type="submit" fullWidth variant="contained" sx={{ marginTop: 2 }}>
              Login
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
};

