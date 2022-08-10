import { useState, useEffect, useContext } from 'react';

import { MainView } from './styles';
import { UserContext } from '../context';

import { UserCard } from '../components/UserCard/index';

export function Friends() {
  let { user, jwt } = useContext(UserContext);

  console.log('friends');

  const [profile, setProfile] = useState(null);

  const getUser = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/user/friends`, {
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

      {profile?.pendingFriends && profile.pendingFriends.map(friend => <UserCard key={friend._id} profile={friend} getUser={getUser} />)}
      {!profile?.pendingFriends.length > 0 && <p>Nobody yet</p>}

      <h2>Friends</h2>
      {profile?.friends && profile.friends.map(friend => <UserCard key={friend._id} profile={friend} />)}
      {!profile?.friends.length > 0 && <p>Nobody yet</p>}
    </MainView>
  );
}
