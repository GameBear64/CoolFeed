import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const [postBody, setPostBody] = useState(post || defaultState);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (post) {
      fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/${postBody._id}`, {
        method: 'PATCH',
        body: JSON.stringify(postBody),
        headers: {
          jwt: JSON.parse(window.localStorage.getItem('cf_data')).jwt,
          'content-type': 'application/json',
        },
      }).then(response => {
        if (response.ok) {
          fetchFeed(setPosts, 0);
          navigate('/');
        }
      });
    } else {
      fetch(`${window.location.protocol}//${window.location.hostname}:3030/post`, {
        method: 'post',
        body: JSON.stringify(postBody),
        headers: {
          jwt: JSON.parse(window.localStorage.getItem('cf_data')).jwt,
          'content-type': 'application/json',
        },
      }).then(response => {
        if (response.ok) {
          setPostBody(defaultState);
          fetchFeed(setPosts, 0);
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

        <PostFormActions postBody={postBody} setPostBody={setPostBody} handleSubmit={handleSubmit} single={!!post} />
      </Box>
    </FormContainer>
  );
}
