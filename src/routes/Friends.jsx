import { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';

import { MainView } from './styles';
import { UserContext } from '../context';

export function Friends() {
  let { user, jwt } = useContext(UserContext);

  console.log('friends');

  const [profile, setProfile] = useState(null);

  const getUser = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/user/${user._id}`, {
      headers: {
        jwt,
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setProfile(data));
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, user]);

  return (
    <MainView id="profile">
      <h1>Friends</h1>

      <h2>Pending friends</h2>

      <h2>Friends</h2>
    </MainView>
  );
}
