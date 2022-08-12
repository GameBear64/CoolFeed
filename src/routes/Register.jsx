import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { MainView, FullWidthInput, Title, OtherOption } from './styles';

import { UserContext, UserUpdateContext } from '../context';

export function Register() {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  let setUser = useContext(UserUpdateContext);

  let user = useContext(UserContext);

  useEffect(() => {
    if (user) return navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleFname = event => {
    setState(s => ({ ...s, firstName: event.target.value }));
  };

  const handleLname = event => {
    setState(s => ({ ...s, lastName: event.target.value }));
  };

  const handleMail = event => {
    setState(s => ({ ...s, email: event.target.value }));
  };

  const handlePassword = event => {
    setState(s => ({ ...s, password: event.target.value }));
  };
  const handleConfrimPassword = event => {
    setState(s => ({ ...s, confirmPassword: event.target.value }));
  };

  const handleSubmit = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/auth/register`, {
      method: 'post',
      body: JSON.stringify(state),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        window.localStorage.cf_data = JSON.stringify(data);
        setUser(data);
      });
  };

  return (
    <MainView id="login">
      <Title>Create your CoolFeed Account</Title>
      <FullWidthInput id="registerName" label="First Name" value={state.firstName} onChange={handleFname} />
      <FullWidthInput id="registerName" label="Last Name" value={state.lastName} onChange={handleLname} />
      <FullWidthInput id="registerEmail" label="Email" value={state.email} onChange={handleMail} />
      <FullWidthInput id="registerPassword" label="Password" value={state.password} onChange={handlePassword} />
      <FullWidthInput id="registerPasswordConfirm" label="Confirm Password" value={state.confirmPassword} onChange={handleConfrimPassword} />
      <Box textAlign="center" style={{ margin: '1em' }}>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </Box>
      <OtherOption>
        Already have an account? <Link to="/login">Log in</Link>
      </OtherOption>
    </MainView>
  );
}
