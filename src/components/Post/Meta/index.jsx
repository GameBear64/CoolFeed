import { useContext } from 'react';
import { Grid } from '@mui/material';
import Twemoji from 'react-twemoji';
import { Link } from 'react-router-dom';

import { ProfilePicture, MetaTab } from './styles';

import { PostComponentMetaSettings } from '../Settings/index';

import { UserContext } from './../../../context/index';

import timeSince from '../../../utils/timeSince';

export function PostComponentMeta({ setPosts, post, single }) {
  let { author, status, createdAt, updatedAt } = post;
  let { user } = useContext(UserContext);

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
          <Link to={`/profile/${author._id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <h2>{author?.nickname || `${author?.firstName} ${author?.lastName || ''}`} </h2>
          </Link>
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
        {(user._id === author._id || !single) && <PostComponentMetaSettings setPosts={setPosts} post={post} style={{ marginLeft: 'auto' }} single={single} />}
      </Grid>
    </MetaTab>
  );
}
