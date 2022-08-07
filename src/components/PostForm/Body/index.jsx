import { TextField, Grid } from '@mui/material';

export function PostFormBody({ postBody, setPostBody }) {
  const handleBodyChange = event => {
    setPostBody(s => ({ ...s, body: event.target.value }));
  };

  const handleStatusChange = event => {
    setPostBody(s => ({ ...s, status: event.target.value }));
  };

  return (
    <Grid container justifyContent="center" id="postFormBody">
      <TextField id="postStatus" label="How are you feeling today?" size="small" value={postBody.status} onChange={handleStatusChange} style={{ width: '95%' }} />
      <TextField id="postBody" label="Got something cool to share?" multiline rows={2} value={postBody.body} onChange={handleBodyChange} style={{ width: '95%' }} />
    </Grid>
  );
}