import React, { createContext, FormEvent, useContext, useRef, useState } from 'react';
import axios, { AxiosError } from "axios"
import { Modal, Box, TextField, Button } from '@mui/material';
import { IsLoggedIn } from './HomePage';
import LetterAvatars from './UserAvatar';
import { Reducer, url } from './appLayout';
import { User } from './user';

const Login = ({ state, onClose }: { state: boolean, onClose: () => void }) => {
  const { user, userDispatch } = useContext(Reducer);
  const [userId, setUserId] = useState<User>(user);
  const { LoggedIn, setLoggedIn } = useContext(IsLoggedIn);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const str = url + '/' + (state === true ? 'login' : 'register');
      console.log("Sending request to:", str);
      console.log("Payload:", emailRef.current?.value, passwordRef.current?.value);
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
            id: res.data.userId,
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
          }
        });
      }
      setLoggedIn(true)
    }
    catch (e) {
      console.error(e);
      alert("An error occurred during the request.");
      window.location.href = '/';
    }
    finally {
      emailRef.current!.value = ''
      passwordRef.current!.value = ''
    }
  }
  return (
    <>
        <Modal open={!LoggedIn} onClose={onClose}>
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
        {LoggedIn && <LetterAvatars></LetterAvatars>}
    </>
  )};


  export default Login