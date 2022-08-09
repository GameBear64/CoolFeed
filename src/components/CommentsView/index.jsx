import { useState, useContext } from 'react';
import { Fade, TextField, Button, Grid } from '@mui/material';
import Twemoji from 'react-twemoji';
import { Link } from 'react-router-dom';

import { UserContext } from './../../context/index';
import { CommentImage, CommentTimestamp, Comment } from './styles';

import { CommentSettings } from './Settings/index';

import fetchPost from './../../utils/fetchPost';
import timeSince from './../../utils/timeSince';

export function PostComments({ setPosts, post }) {
  const { user, jwt } = useContext(UserContext);
  let { _id, comments } = post;
  console.log(post);

  const [commentFelid, setCommentFelid] = useState('');

  const handleComment = event => {
    setCommentFelid(event.target.value);
  };

  const handlePostComment = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/comment/${_id}`, {
      method: 'POST',
      body: JSON.stringify({ body: commentFelid }),
      headers: {
        jwt,
        'content-type': 'application/json',
      },
    }).then(response => {
      if (response.ok) {
        setCommentFelid('');
        fetchPost(setPosts, _id);
      }
    });
  };

  return (
    <div>
      <Grid container style={{ marginBottom: '2em' }}>
        <Grid item xs={10}>
          <TextField id="commentForm" label="Write a comment!" size="small" value={commentFelid} onChange={handleComment} style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'right' }}>
          <Button onClick={handlePostComment}>Post</Button>
        </Grid>
      </Grid>
      {comments.length > 0 &&
        comments.map(({ _id, author, createdAt, updatedAt, body }) => (
          <Fade in timeout={500} key={_id}>
            <Comment>
              <Grid
                item
                xs={10}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <CommentImage src={author?.profilePicture} alt="ProfilePicture" />

                <Twemoji>
                  <Grid
                    item
                    xs={10}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Link to={`/profile/${author._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <h3>{author?.nickname || `${author?.firstName} ${author?.lastName || ''}`} </h3>
                    </Link>
                    <CommentTimestamp>
                      · {timeSince(createdAt)} {createdAt !== updatedAt ? ' · edited' : ''}
                    </CommentTimestamp>
                    {(user._id === author._id || user._id === post.author._id) && <CommentSettings setPosts={setPosts} id={_id} postId={post._id} body={body} author={author} />}
                  </Grid>

                  <p>{body}</p>
                </Twemoji>
              </Grid>
            </Comment>
          </Fade>
        ))}
    </div>
  );
}
