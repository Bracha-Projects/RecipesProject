import Avatar from '@mui/material/Avatar';
import { Grid2 as Grid } from '@mui/material';
import { useContext } from 'react';
import { Reducer } from '../App';

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
  const firstLetter = user.firstName ? user.firstName[0].toLowerCase() : ''
  const secondLetter = user.lastName ? user.lastName[0].toLowerCase() : ''
  return (
    <>
      <div style={{ display: "flex" }}>
        <Avatar
          sx={{ bgcolor: stringToColor((user.firstName || ' ') + ' ' + user.lastName || '  ') }}
          children={firstLetter + secondLetter}
        />
        <Grid container>
          <Grid size={4}>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

