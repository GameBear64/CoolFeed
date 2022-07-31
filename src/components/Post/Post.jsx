import { Button, Icon } from '@mui/material';

export function Post({ post }) {
  console.log(post);
  let { body, author } = post;
  return (
    <div id="feed" style={{ backgroundColor: 'lightpink', marginBottom: '5vh' }}>
      <div id="settings">
        <Icon>more_horiz</Icon>
      </div>
      <div id="header">
        <img src="https://picsum.photos/50" alt="ProfilePicture" />
        <p>{author.nickname || `${author.firstName} ${author.lastName || ''}`} </p>
        <p>status and timestamp</p>
      </div>
      <p id="post">{body}</p>
      <div id="actions">
        <Button>
          <Icon>thumb_up</Icon>
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
