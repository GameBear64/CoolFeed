import { useState } from 'react';
import { Button, ToggleButton, ToggleButtonGroup, Dialog } from '@mui/material';
import Picker from 'emoji-picker-react';
import Twemoji from 'react-twemoji';

import { SubmitButton, EmoteButton } from './styles';

export function PostFormActions({ postBody, setPostBody, handleSubmit, single }) {
  const [openPicker, setOpenPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    let emote = emojiObject?.emoji || '👍';
    setPostBody(s => ({ ...s, emote }));

    handleEmojiToggle();
  };

  const handleModeChange = event => {
    setPostBody(s => ({ ...s, likeMode: event.target.value }));
  };

  const handleEmojiToggle = () => {
    setOpenPicker(s => !s);
  };

  return (
    <div id="postFormActions">
      <Dialog open={openPicker} onClose={handleEmojiToggle} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <Picker onEmojiClick={onEmojiClick} />
        <Button id="basic-button" onClick={onEmojiClick}>
          <Twemoji>Use default 👍</Twemoji>
        </Button>
      </Dialog>

      {!single && (
        <>
          <ToggleButtonGroup size="small" color="primary" value={postBody.likeMode} exclusive onChange={handleModeChange}>
            <ToggleButton value="regular">Regular</ToggleButton>
            <ToggleButton value="cheer">Cheer</ToggleButton>
          </ToggleButtonGroup>

          <EmoteButton id="basic-button" onClick={handleEmojiToggle}>
            <Twemoji>{postBody.emote}</Twemoji>
          </EmoteButton>
        </>
      )}
      <SubmitButton variant="contained" onClick={handleSubmit}>
        Post!
      </SubmitButton>

      {single && (
        <>
          <br /> <br />
        </>
      )}
    </div>
  );
}
