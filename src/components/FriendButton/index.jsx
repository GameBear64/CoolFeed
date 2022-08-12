import { useContext } from 'react';
import { Button } from '@mui/material';

import { UserContext } from '../../context/index';

export function FriendButton({ profile, getUser }) {
  let { user, jwt } = useContext(UserContext);

  const addFriend = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/user/friend/${profile._id}`, {
      method: 'post',
      headers: {
        jwt,
        'content-type': 'application/json',
      },
    }).then(res => {
      if (res.ok) getUser();
    });
  };

  const cancelFriendRequest = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/user/unfriend/${profile._id}`, {
      method: 'post',
      headers: {
        jwt,
        'content-type': 'application/json',
      },
    }).then(res => {
      if (res.ok) getUser();
    });
  };

  const friendButton = () => {
    if (user?._id === profile?._id) return;
    if (profile?.pendingFriends.includes(user?._id)) {
      return (
        <>
          <Button disabled>Friend request sent</Button>
          <Button color="error" onClick={cancelFriendRequest}>
            Cancel friend request
          </Button>
        </>
      );
    }
    if (profile?.friends.some(fr => fr._id === user?._id)) {
      return (
        <>
          <Button disabled>Friends</Button>
          <Button color="error" onClick={cancelFriendRequest}>
            Remove Friend
          </Button>
        </>
      );
    }

    return <Button onClick={addFriend}>Add friend</Button>;
  };

  return friendButton();
}
