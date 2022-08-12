import { Link } from 'react-router-dom';
import { Fade, Grid } from '@mui/material';

import { FriendButton } from './../FriendButton/index';

import { ProfilePicture, Card } from './styles';

export function UserCard({ profile, getUser }) {
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
          <ProfilePicture src={profile?.profilePicture} alt="ProfilePicture" />

          <div>
            <Link to={`/profile/${profile._id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <h2>{profile?.nickname || `${profile?.firstName} ${profile?.lastName || ''}`} </h2>
            </Link>
            {getUser && <FriendButton profile={profile} getUser={getUser} />}
          </div>
        </Grid>
      </Card>
    </Fade>
  );
}
