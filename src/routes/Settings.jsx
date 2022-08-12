import { useState, useEffect, useContext } from 'react';
import { Button, Divider, Box } from '@mui/material';

import { UserContext } from '../context';

import { MainView, FullWidthInput, HalfWidthInput } from './styles';

export function Settings() {
  let { user, jwt } = useContext(UserContext);

  const defaultPasswordsState = { oldPassword: '', password: '', confirmPassword: '' };

  const filterUserFelids = ({ firstName, lastName, nickname, email, biography }) => ({ firstName, lastName, nickname, email, biography });
  const [profile, setProfile] = useState({ firstName: '', lastName: '', nickname: '', email: '', biography: '' });
  const [passwords, setPasswords] = useState(defaultPasswordsState);

  const getUser = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/user/${user._id}`, {
      headers: {
        jwt,
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setProfile(filterUserFelids(data)));
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, user]);

  const handleFName = event => {
    setProfile(s => ({ ...s, firstName: event.target.value }));
  };
  const handleLName = event => {
    setProfile(s => ({ ...s, lastName: event.target.value }));
  };
  const handleNickname = event => {
    setProfile(s => ({ ...s, nickname: event.target.value }));
  };
  const handleMail = event => {
    setProfile(s => ({ ...s, email: event.target.value }));
  };
  const handleBio = event => {
    setProfile(s => ({ ...s, biography: event.target.value }));
  };

  const handleOldPassword = event => {
    setPasswords(s => ({ ...s, oldPassword: event.target.value }));
  };
  const handlePassword = event => {
    setPasswords(s => ({ ...s, password: event.target.value }));
  };
  const handleConfirmPassword = event => {
    setPasswords(s => ({ ...s, confirmPassword: event.target.value }));
  };

  const handleSave = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/user`, {
      method: 'PATCH',
      body: JSON.stringify(profile),
      headers: {
        jwt,
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) getUser();
    });
  };

  const handlePasswordReset = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/auth/password`, {
      method: 'PATCH',
      body: JSON.stringify({ email: profile.email, ...passwords }),
      headers: {
        jwt,
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) {
        getUser();
        setPasswords(defaultPasswordsState);
      }
    });
  };

  const handleDelete = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/user`, {
      method: 'DELETE',
      headers: {
        jwt,
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) getUser();
    });
  };

  return (
    <MainView id="profile">
      <h1>
        {profile?.firstName} {profile?.lastName}'s settings
      </h1>
      <br /> <br />
      <h2>General Profile Info</h2>
      <Divider />
      <br />
      <HalfWidthInput id="settingsFName" label="First name" value={profile.firstName} onChange={handleFName} />
      <HalfWidthInput id="settingsLName" label="Last name" value={profile.lastName} onChange={handleLName} />
      <br />
      <FullWidthInput id="settingsNickname" label="Nickname" value={profile.nickname} onChange={handleNickname} />
      <br /> <br />
      <FullWidthInput id="settingsMail" label="Email" value={profile.email} onChange={handleMail} />
      <br /> <br />
      <FullWidthInput id="settingsBio" label="Biography" multiline rows={2} value={profile.biography} onChange={handleBio} />
      <Box textAlign="center" style={{ margin: '2em' }}>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
      <h2>Security</h2>
      <Divider />
      <br />
      <FullWidthInput id="settingsPasswordOld" label="Old password" type="password" value={passwords.oldPassword} onChange={handleOldPassword} />
      <HalfWidthInput id="settingsPassword" label="New password" type="password" value={passwords.password} onChange={handlePassword} />
      <HalfWidthInput id="settingsPasswordConfirm" label="Confirm password" type="password" value={passwords.confirmPassword} onChange={handleConfirmPassword} />
      <Box textAlign="center" style={{ margin: '2em' }}>
        <Button variant="contained" onClick={handlePasswordReset}>
          Change Password
        </Button>
      </Box>
      <h2>Danger Zone</h2>
      <Divider />
      <br />
      <Box textAlign="center" style={{ margin: '1em' }}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete account
        </Button>
      </Box>
    </MainView>
  );
}
