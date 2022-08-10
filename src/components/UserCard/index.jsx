import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Fade, Grid, Button } from '@mui/material';
import Twemoji from 'react-twemoji';

import { UserContext } from '../../context/index';

import { FriendButton } from './../FriendButton/index';

import { ProfilePicture, Card } from './styles';

export function UserCard({ profile, getUser }) {
  let { user, jwt } = useContext(UserContext);

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

          <Twemoji>
            <Link to={`/profile/${profile._id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <h2>{profile?.nickname || `${profile?.firstName} ${profile?.lastName || ''}`} </h2>
            </Link>
            <FriendButton profile={profile} getUser={getUser} />
          </Twemoji>
        </Grid>
      </Card>
    </Fade>
  );
}
