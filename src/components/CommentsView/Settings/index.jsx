import { useState, useContext } from 'react';
import { TextField, Button, Icon, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { UserContext } from './../../../context/index';
import fetchPost from './../../../utils/fetchPost';
import emojiPicker from './../../../utils/emojiPicker';

export function CommentSettings({ setPosts, id, postId, body, author }) {
  const { user, jwt } = useContext(UserContext);
  const [commentFelid, setCommentFelid] = useState(body);

  const [menuElement, setMenuElement] = useState(null);
  const openMenu = Boolean(menuElement);

  const [openWarning, setOpenWarning] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleComment = event => {
    setCommentFelid(emojiPicker(event.target.value));
  };

  const handleMenuOpen = event => {
    setMenuElement(event.currentTarget);
  };

  const handleMenuOption = event => {
    if (event.target.dataset.item === 'delete') setOpenWarning(true);

    if (event.target.dataset.item === 'edit') setOpenEdit(true);

    setMenuElement(null);
  };

  const handleDeleteOption = event => {
    if (event.target.dataset.delete === 'yes') {
      fetch(`${window.location.protocol}//${window.location.hostname}:3030/comment/${postId}/${id}`, {
        method: 'DELETE',
        headers: {
          jwt,
          'content-type': 'application/json',
        },
      }).then(response => {
        if (response.ok) {
          fetchPost(setPosts, postId);
        }
      });
    }
    setOpenWarning(false);
  };

  const handleEditOption = event => {
    if (event.target.dataset.delete === 'post') {
      fetch(`${window.location.protocol}//${window.location.hostname}:3030/comment/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ body: commentFelid }),
        headers: {
          jwt,
          'content-type': 'application/json',
        },
      }).then(response => {
        if (response.ok) {
          fetchPost(setPosts, postId);
        }
      });
    }

    if (event.target.dataset.delete === 'discard') setCommentFelid(body);

    setOpenEdit(false);
  };

  return (
    <div id="postMetaSettings">
      <Dialog open={openWarning} onClose={handleDeleteOption} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Do you really want to delete this?</DialogTitle>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button data-delete="no" onClick={handleDeleteOption}>
            No, go back
          </Button>
          <Button data-delete="yes" onClick={handleDeleteOption} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleEditOption} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Editing comment</DialogTitle>
        <DialogContent>
          <TextField id="commentEdit" label="Edit comment" size="small" value={commentFelid} onChange={handleComment} style={{ width: '30em', marginTop: '1em', marginBottom: '1em' }} />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button data-delete="discard" onClick={handleEditOption}>
            Discard
          </Button>
          <Button data-delete="post" onClick={handleEditOption} autoFocus>
            Post
          </Button>
        </DialogActions>
      </Dialog>

      <Menu id="commentMenu" anchorEl={menuElement} open={openMenu} onClose={handleMenuOption}>
        <MenuItem data-item="delete" onClick={handleMenuOption}>
          Delete
        </MenuItem>
        {author._id === user._id && (
          <MenuItem data-item="edit" onClick={handleMenuOption}>
            Edit
          </MenuItem>
        )}
      </Menu>

      <div id="settings">
        <Button aria-controls={openMenu ? 'commentMenu' : undefined} size="small" aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} onClick={handleMenuOpen}>
          <Icon>more_horiz</Icon>
        </Button>
      </div>
    </div>
  );
}
