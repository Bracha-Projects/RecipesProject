import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Grid2 as Grid } from '@mui/material';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { Reducer } from './appLayout';
import UserUpdateForm from './UserUpdateForm';
import { Link } from 'react-router-dom';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string = '') {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export const UpdateForm = createContext<{
updateForm:boolean;openUpdateForm:Dispatch<SetStateAction<boolean>>;}
>({
  updateForm:false, openUpdateForm: ()=>{}});

export default function LetterAvatars() {
  const { user } = React.useContext(Reducer);
  const [OpenUpdateForm, setUpdateForm] = useState(false);
  return (
    <>
    <div style={{display:"flex"}}>
    <UpdateForm.Provider value={{updateForm:OpenUpdateForm,openUpdateForm:setUpdateForm}}>
      <Avatar {...stringAvatar((user.firstName || ' ') + ' ' + user.lastName || '  ')} />
      <Grid container>
        <Grid size={4}>
          {!OpenUpdateForm ?
            <Button style={{margin:"5px"}} color="primary" variant="outlined" onClick={()=>setUpdateForm(true)}>
              update
            </Button> : <UserUpdateForm></UserUpdateForm>
          }
        </Grid>
      </Grid>
      </UpdateForm.Provider>
      </div>
    </>
  );
}

