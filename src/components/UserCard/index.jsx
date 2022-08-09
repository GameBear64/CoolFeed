import { Link } from 'react-router-dom';
import { Fade, Grid, Button } from '@mui/material';
import Twemoji from 'react-twemoji';

import { ProfilePicture, Card } from './styles';

export function UserCard({ user }) {
  return (
    <Fade in timeout={500}>
      <Card id="userCard">
        <Grid
          item
          xs={10}
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <ProfilePicture src={user?.profilePicture} alt="ProfilePicture" />

          <Twemoji>
            <Link to={`/profile/${user._id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <h2>{user?.nickname || `${user?.firstName} ${user?.lastName || ''}`} </h2>
            </Link>
            <Button> Add Friend </Button>
          </Twemoji>
        </Grid>
      </Card>
    </Fade>
  );
}
