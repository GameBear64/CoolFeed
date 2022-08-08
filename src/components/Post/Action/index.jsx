import { useState, useContext } from 'react';
import { Button, Icon, Grid, Tooltip } from '@mui/material';
import Twemoji from 'react-twemoji';
import { useNavigate } from 'react-router-dom';

import { LikeButton } from './styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { UserContext } from './../../../context/index';

export function PostComponentAction({ post }) {
  const { jwt } = useContext(UserContext);
  let { _id, likes, emote } = post;

  const [likesState, setLikesState] = useState(likes?.length);

  const navigate = useNavigate();

  const handleLIke = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/like/${_id}`, {
      method: 'PATCH',
      headers: {
        jwt,
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setLikesState(data.likes);
      });
  };

  const goToPost = () => {
    navigate(`/post/${_id}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.host}/post/${_id}`);
  };

  return (
    <Grid id="actions" container direction="row" justifyContent="space-around" alignItems="center">
      <LikeButton onClick={handleLIke}>
        <Twemoji>{emote}</Twemoji>
        {likesState}
      </LikeButton>
      <Button onClick={goToPost}>
        <Icon>mode_comment</Icon>
      </Button>
      <Tooltip title="Copy to clipboard">
        <Button onClick={copyToClipboard}>
          <Icon>share</Icon>
        </Button>
      </Tooltip>
    </Grid>
  );
}
