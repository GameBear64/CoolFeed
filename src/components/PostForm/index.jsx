import { useState } from 'react';
import { Box } from '@mui/material';

import { PostFormImages } from './Images/index';
import { PostFormBody } from './Body/index';
import { PostFormActions } from './Action/index';

import fetchFeed from '../../utils/fetchFeed';

import { FormContainer } from './styles';

export function PostForm({ setPosts, post }) {
  const defaultState = {
    status: '',
    body: '',
    images: [],
    likeMode: 'regular',
    emote: '👍',
  };

  console.log(post);

  const [postBody, setPostBody] = useState(post || defaultState);

  const handleSubmit = () => {
    if (post) {
      fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/${postBody._id}`, {
        method: 'patch',
        body: JSON.stringify(postBody),
        headers: {
          jwt: window.localStorage.getItem('jwt'),
          'content-type': 'application/json',
        },
      }).then(response => {
        console.log();
        // if (response.ok) {
        //   setPostBody(defaultState);
        //   fetchFeed(setPosts);
        // }
      });
    } else {
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
    }
  };

  return (
    <FormContainer id="postForm">
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
    </FormContainer>
  );
}
