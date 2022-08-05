import { useEffect, useState } from 'react';
import { Button, Icon, Grid } from '@mui/material';
import Twemoji from 'react-twemoji';

import { LikeButton } from './styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export function PostComponentAction({ post }) {
  let { _id, likes, emote } = post;
  const [likesState, setLikesState] = useState(likes?.length);

  const handleLIke = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/like/${_id}`, {
      method: 'PATCH',
      headers: {
        jwt: window.localStorage.getItem('jwt'),
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setLikesState(data.likes);
      });
  };
  return (
    <Grid id="actions" container direction="row" justifyContent="space-around" alignItems="center">
      <LikeButton onClick={handleLIke}>
        <Twemoji>{emote}</Twemoji>
        {likesState}
      </LikeButton>
      <Button>
        <Icon>mode_comment</Icon>
      </Button>
      <Button>
        <Icon>share</Icon>
      </Button>
    </Grid>
  );
}
