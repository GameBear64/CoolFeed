import { Grid } from '@mui/material';
import Twemoji from 'react-twemoji';

import { ProfilePicture } from './styles';

import { PostComponentMetaSettings } from '../Settings/index';

import timeSince from '../../../utils/timeSince';

export function PostComponentMeta({ setPosts, post }) {
  let { _id, author, status, createdAt, updatedAt } = post;

  return (
    <Grid container>
      <Grid
        item
        xs={10}
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <ProfilePicture src={author?.profilePicture} alt="ProfilePicture" />

        <Twemoji>
          <h2>{author?.nickname || `${author?.firstName} ${author?.lastName || ''}`} </h2>
          <p>
            {status || ''} {status && '·'} {timeSince(createdAt)} {createdAt === updatedAt ? ' · edited' : ''}
          </p>
        </Twemoji>
      </Grid>

      <Grid
        item
        xs={2}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <PostComponentMetaSettings setPosts={setPosts} id={_id} style={{ marginLeft: 'auto' }} />
      </Grid>
    </Grid>
  );
}
