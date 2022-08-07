import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import fetchFeed from '../../../utils/fetchFeed';
import { UserContext } from './../../../context/index';

export function PostComponentMetaSettings({ setPosts, post, single }) {
  const { _id, author } = post;
  let { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [openWarning, setOpenWarning] = useState(false);

  const [menuElement, setMenuElement] = useState(null);
  const openMenu = Boolean(menuElement);

  const handleMenuOpen = event => {
    setMenuElement(event.currentTarget);
  };

  const handleMenuOption = event => {
    setMenuElement(null);

    if (event.target.dataset.item === 'delete') setOpenWarning(true);

    if (event.target.dataset.item === 'edit') {
      navigate(`/post/${_id}/edit`);
    }

    if (event.target.dataset.item === 'view') {
      navigate(`/post/${_id}`);
    }
  };

  const handleDialogOption = event => {
    if (event.target.dataset.delete === 'yes') {
      fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/${_id}`, {
        method: 'DELETE',
        headers: {
          jwt: JSON.parse(window.localStorage.getItem('cf_data')).jwt,
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          fetchFeed(setPosts, 0);
        });
    }
    setOpenWarning(false);
  };

  return (
    <div id="postMetaSettings">
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
        {!single && (
          <MenuItem data-item="view" onClick={handleMenuOption}>
            View
          </MenuItem>
        )}
        {user._id === author._id && (
          <MenuItem data-item="edit" onClick={handleMenuOption}>
            Edit
          </MenuItem>
        )}

        {user._id === author._id && (
          <MenuItem data-item="delete" onClick={handleMenuOption}>
            Delete
          </MenuItem>
        )}
      </Menu>

      <div id="settings">
        <Button id="basic-button" aria-controls={openMenu ? 'postMenu' : undefined} aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} onClick={handleMenuOpen}>
          <Icon>more_horiz</Icon>
        </Button>
      </div>
    </div>
  );
}
