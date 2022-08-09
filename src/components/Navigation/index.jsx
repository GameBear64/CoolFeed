/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDebouncedEffect } from './../../utils/useDebounce';

import { Icon, TextField, Button, Menu, MenuItem, Grid } from '@mui/material';

import { UserUpdateContext, SearchStateContext } from './../../context/index';

export function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [searchTerm, setSearchTerm] = useState('');

  let searchState = useContext(SearchStateContext);

  const [search, setSearch] = searchState;

  let setUser = useContext(UserUpdateContext);

  const navigate = useNavigate();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    if (event.target.dataset.item === 'logout') {
      window.localStorage.cf_data = '';
      setUser(null);
      navigate(`/login`);
    }

    if (event.target.dataset.item === 'profile') {
      navigate(`/profile`);
    }

    if (event.target.dataset.item === 'friends') {
      navigate(`/friends`);
    }

    setAnchorEl(null);
  };

  const openSearch = () => {
    console.log('opening search');
    navigate(`/search`);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  useDebouncedEffect(() => setSearch(searchTerm), [searchTerm], 1000);

  return (
    <Grid id="nav" container direction="row" justifyContent="space-between" alignItems="center" style={{ backgroundColor: 'lightblue' }}>
      <Link to={'/'}>
        <Icon>home</Icon> Home
      </Link>

      <TextField id="search" label="Search" size="small" style={{ width: '50vw' }} value={searchTerm} onFocus={openSearch} onChange={handleSearch} />

      <Button aria-controls={open ? 'navMenu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
        <Icon>menu</Icon>
      </Button>

      <Menu id="navMenu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem data-item="profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem data-item="friends" onClick={handleClose}>
          Friends
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
