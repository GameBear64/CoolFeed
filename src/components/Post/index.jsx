import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import timeSince from '../../utils/timeSince';
import fetchFeed from '../../utils/fetchFeed';

export function PostComponent({ setPosts, post }) {
  // console.log(post);
  let { _id, body, author, status, createdAt, images, likes } = post;
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

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openWarning, setOpenWarning] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    console.log(event.target.dataset.item);
    setAnchorEl(null);

    if (event.target.dataset.item === 'delete') setOpenWarning(true);

    if (event.target.dataset.item === 'edit') {
      navigate(`/post/${_id}/edit`);
    }

    if (event.target.dataset.item === 'view') {
      navigate(`/post/${_id}`);
    }
  };

  const handleCloseOpen = event => {
    if (event.target.dataset.delete === 'yes') {
      fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/${_id}`, {
        method: 'DELETE',
        headers: {
          jwt: window.localStorage.getItem('jwt'),
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          fetchFeed(setPosts);
        });
    }
    setOpenWarning(false);
  };

  return (
    <div id="post" style={{ backgroundColor: 'lightpink', marginBottom: '5vh' }}>
      <Dialog open={openWarning} onClose={handleCloseOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Do you really want to delete this?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Deleted posts cannot be recovered, all contents of this post and everything related to it will be delete, proceed? </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button data-delete="no" onClick={handleCloseOpen}>
            No, go back
          </Button>
          <Button data-delete="yes" onClick={handleCloseOpen} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>

      <div id="settings">
        <Button id="basic-button" aria-controls={open ? 'postMenu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
          <Icon>more_horiz</Icon>
        </Button>

        <Menu id="postMenu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem data-item="view" onClick={handleClose}>
            View
          </MenuItem>
          <MenuItem data-item="edit" onClick={handleClose}>
            Edit
          </MenuItem>
          <MenuItem data-item="delete" onClick={handleClose}>
            Delete
          </MenuItem>
        </Menu>
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
