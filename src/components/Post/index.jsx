import { useState } from 'react';
import { Button, Icon } from '@mui/material';
import timeSince from '../../utils/timeSince';

export function Post({ post }) {
  // console.log(post);
  let { _id, body, author, status, createdAt, images, likes } = post;
  console.log(_id);
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
        console.log(data);
        setLikesState(data.likes);
      });
  };

  return (
    <div id="post" style={{ backgroundColor: 'lightpink', marginBottom: '5vh' }}>
      <div id="settings">
        <Icon>more_horiz</Icon>
      </div>
      <div id="header">
        <img src="https://picsum.photos/50" alt="ProfilePicture" />
        <p>{author?.nickname || `${author?.firstName} ${author?.lastName || ''}`} </p>
        <p>{status || ''}</p>
        <p>{timeSince(createdAt)}</p>
      </div>
      <p id="post">{body}</p>
      {images && images.map(({ _id, name, data }) => <img key={_id} src={data} alt={name} />)}

      <div id="actions">
        <Button onClick={handleLIke}>
          <Icon>thumb_up</Icon> {likesState}
        </Button>
        <Button>
          <Icon>mode_comment</Icon>
        </Button>
        <Button>
          <Icon>share</Icon>
        </Button>
      </div>
    </div>
  );
}
