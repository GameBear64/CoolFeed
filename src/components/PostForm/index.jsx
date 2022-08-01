import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

export function PostForm({ setPosts }) {
  const [postBody, setPostBody] = useState('');
  const [postFiles, setPostFiles] = useState([]);

  const handleBodyChange = event => {
    setPostBody(event.target.value);
  };

  const handleFileChange = event => {
    let file = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPostFiles(postFiles => [...postFiles, { name: file.name, data: reader.result }]);
    };
  };

  const handleSubmit = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/post`, {
      method: 'post',
      body: JSON.stringify({
        body: postBody,
        images: postFiles,
      }),
      headers: {
        jwt: window.localStorage.getItem('jwt'),
        'content-type': 'application/json',
      },
    }).then(response => {
      if (response.ok) {
        setPostBody('');
        setPostFiles([]);
        fetch(`${window.location.protocol}//${window.location.hostname}:3030/post`, {
          headers: {
            jwt: window.localStorage.getItem('jwt'),
            'content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(data => setPosts(data));
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
        <TextField id="postMainForm" label="Got something cool to share?" multiline rows={4} style={{ width: '50vw' }} value={postBody} onChange={handleBodyChange} />
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </div>
  );
}
