import { FormEvent, useContext, useRef } from 'react';
import axios from "axios"
import { Modal, Box, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setError } from '../redux/ErrorSlice'
import { IsLoggedIn, Reducer, url } from '../App';

export default ({ state, Close, showModal }: { state: boolean, Close: () => void, showModal: boolean }) => {
  const { userDispatch } = useContext(Reducer);
  const { setLoggedIn } = useContext(IsLoggedIn);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 400:
            dispatch(setError("Bad Request: The server could not understand the request due to invalid syntax."));
            break;
          case 401:
            dispatch(setError("Unauthorized: Access is denied due to invalid credentials."));
            break;
          case 403:
            dispatch(setError("Forbidden: You do not have permission to access this resource."));
            break;
          default:
            dispatch(setError("An unexpected error occurred."));
            break;
        }
      } else {
        dispatch(setError("An unexpected error occurred."));
      }
      setLoggedIn(false);
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

