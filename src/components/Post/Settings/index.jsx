import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import fetchFeed from '../../../utils/fetchFeed';

export function PostComponentMetaSettings({ setPosts, id }) {
  const navigate = useNavigate();

  const [openWarning, setOpenWarning] = useState(false);

  const [menuElement, setMenuElement] = useState(null);
  const openMenu = Boolean(menuElement);

  const handleMenuOpen = event => {
    setMenuElement(event.currentTarget);
  };

  const handleMenuOption = event => {
    console.log(event.target.dataset.item);
    setMenuElement(null);

    if (event.target.dataset.item === 'delete') setOpenWarning(true);

    if (event.target.dataset.item === 'edit') {
      navigate(`/post/${id}/edit`);
    }

    if (event.target.dataset.item === 'view') {
      navigate(`/post/${id}`);
    }
  };

  const handleDialogOption = event => {
    if (event.target.dataset.delete === 'yes') {
      fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/${id}`, {
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
    <div id="post">
      <Dialog open={openWarning} onClose={handleDialogOption} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Do you really want to delete this?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Deleted posts cannot be recovered, all contents of this post and everything related to it will be delete, proceed? </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button data-delete="no" onClick={handleDialogOption}>
            No, go back
          </Button>
          <Button data-delete="yes" onClick={handleDialogOption} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>

      <Menu id="postMenu" anchorEl={menuElement} open={openMenu} onClose={handleMenuOption}>
        <MenuItem data-item="view" onClick={handleMenuOption}>
          View
        </MenuItem>
        <MenuItem data-item="edit" onClick={handleMenuOption}>
          Edit
        </MenuItem>
        <MenuItem data-item="delete" onClick={handleMenuOption}>
          Delete
        </MenuItem>
      </Menu>

      <div id="settings">
        <Button id="basic-button" aria-controls={openMenu ? 'postMenu' : undefined} aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} onClick={handleMenuOpen}>
          <Icon>more_horiz</Icon>
        </Button>
      </div>
    </div>
  );
}
