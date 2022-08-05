import { Grid } from '@mui/material';
import Twemoji from 'react-twemoji';

import { ProfilePicture, MetaTab } from './styles';

import { PostComponentMetaSettings } from '../Settings/index';

import timeSince from '../../../utils/timeSince';

export function PostComponentMeta({ setPosts, post, single }) {
  let { _id, author, status, createdAt, updatedAt } = post;

  return (
    <MetaTab container>
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
          {/* {createdAt} <br /> {updatedAt} */}
          <p>
            {status || ''} {status && '·'} {timeSince(createdAt)} {createdAt !== updatedAt ? ' · edited' : ''}
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
        <PostComponentMetaSettings setPosts={setPosts} id={_id} style={{ marginLeft: 'auto' }} single={single} />
      </Grid>
    </MetaTab>
  );
}
