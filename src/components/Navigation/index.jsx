import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Icon, TextField, Button, Menu, MenuItem, Grid } from '@mui/material';

import { UserUpdateContext } from '../../context';

export function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  let setUser = useContext(UserUpdateContext);

  const navigate = useNavigate();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    if (event.target.dataset.item === 'logout') {
      window.localStorage.jwt = '';
      setUser(null);
      navigate(`/login`);
    }

    if (event.target.dataset.item === 'view') {
      // navigate(`/post/${_id}`);
    }
    setAnchorEl(null);
  };

  return (
    <Grid id="nav" container direction="row" justifyContent="space-between" alignItems="center" style={{ backgroundColor: 'lightblue' }}>
      <Link to={'/'}>
        <Icon>home</Icon> Home
      </Link>
      <TextField id="loginEmail" label="Search" size="small" style={{ width: '50vw' }} />

      <Button aria-controls={open ? 'navMenu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
        <Icon>menu</Icon>
      </Button>

      <Menu id="navMenu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem data-item="profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem data-item="settings" onClick={handleClose}>
          Settings
        </MenuItem>
        <MenuItem data-item="logout" onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  );
}
