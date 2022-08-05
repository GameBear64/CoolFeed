import { useState } from 'react';
import { Box } from '@mui/material';

import { PostFormImages } from './Images/index';
import { PostFormBody } from './Body/index';
import { PostFormActions } from './Action/index';

import fetchFeed from '../../utils/fetchFeed';

export function PostForm({ setPosts }) {
  const defaultState = {
    status: '',
    body: '',
    images: [],
    likeMode: 'regular',
    emote: '👍',
  };

  const [postBody, setPostBody] = useState(defaultState);

  const handleSubmit = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/post`, {
      method: 'post',
      body: JSON.stringify(postBody),
      headers: {
        jwt: window.localStorage.getItem('jwt'),
        'content-type': 'application/json',
      },
    }).then(response => {
      if (response.ok) {
        setPostBody(defaultState);
        fetchFeed(setPosts);
      }
    });
  };

  return (
    <div id="postForm">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        autoComplete="off"
      >
        <PostFormBody postBody={postBody} setPostBody={setPostBody} />

        <PostFormImages postBody={postBody} setPostBody={setPostBody} />

        <PostFormActions postBody={postBody} setPostBody={setPostBody} handleSubmit={handleSubmit} />
      </Box>
    </div>
  );
}
