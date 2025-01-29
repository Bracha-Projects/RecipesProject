import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Grid2 as Grid } from '@mui/material';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { Reducer } from './AppLayout';
import { Link } from 'react-router-dom';
import { IsLoggedIn } from './HomePage';

function stringToColor(string: string = ' ') {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export default () => {
  const { user } = useContext(Reducer);
  const {LoggedIn,setLoggedIn} = useContext(IsLoggedIn);
  const firstLetter = user.firstName? user.firstName[0] : ''
  const secondLetter = user.lastName? user.lastName[0] : ''
  return (
    <>
      <div style={{ display: "flex" }}>
          <Avatar
            sx={{ bgcolor: stringToColor((user.firstName || ' ') + ' ' + user.lastName || '  ')}}
            children = {firstLetter + secondLetter}
          />
          <Grid container>
            <Grid size={4}>
            </Grid>
          </Grid>
      </div>
      <Button color="primary" variant="contained" onClick={() => { setLoggedIn(false)}}>Sign Out</Button>
    </>
  );
}

