import { Button, Icon } from '@mui/material';

export function Post() {
  return (
    <div id="feed" style={{ backgroundColor: 'lightpink' }}>
      <div id="settings">
        <Icon>more_horiz</Icon>
      </div>
      <div id="header">
        <img src="https://picsum.photos/50" alt="ProfilePicture" />
        <p>name</p>
        <p>status and timestamp</p>
      </div>
      <p id="post">post content</p>
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
