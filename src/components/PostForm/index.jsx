import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import fetchFeed from '../../utils/fetchFeed';

export function PostForm({ setPosts }) {
  const defaultState = {
    status: '',
    body: '',
    images: [],
  };

  const [postBody, setPostBody] = useState(defaultState);

  const handleBodyChange = event => {
    setPostBody(s => ({ ...s, body: event.target.value }));
  };

  const handleStatusChange = event => {
    setPostBody(s => ({ ...s, status: event.target.value }));
  };

  const handleFileChange = event => {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPostBody(postBody => ({
        ...postBody,
        images: [...postBody.images, { name: file.name, data: reader.result }],
      }));
    };
  };

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
    <div id="postForm" style={{ backgroundColor: 'lightpink', marginBottom: '5vh' }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="postStatus" label="How are you feeling today?" value={postBody.status} onChange={handleStatusChange} />
        <TextField id="postBody" label="Got something cool to share?" multiline rows={4} style={{ width: '50vw' }} value={postBody.body} onChange={handleBodyChange} />
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </div>
  );
}
