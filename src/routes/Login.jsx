import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { UserContext, UserUpdateContext } from '../context';

import { MainView, FullWidthInput, Title, OtherOption } from './styles';

export function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  let setUser = useContext(UserUpdateContext);

  let user = useContext(UserContext);

  useEffect(() => {
    if (user) return navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleMail = event => {
    setState(s => ({ ...s, email: event.target.value }));
  };

  const handlePassword = event => {
    setState(s => ({ ...s, password: event.target.value }));
  };

  const handleSubmit = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/auth/login`, {
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
      <Title>Login to your CoolFeed account</Title>

      <FullWidthInput id="loginEmail" label="Email" value={state.email} onChange={handleMail} />
      <FullWidthInput id="loginPassword" label="Password" type="password" value={state.password} onChange={handlePassword} />
      <Box textAlign="center" style={{ margin: '1em' }}>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </Box>
      <OtherOption>
        Don't have an account? <Link to="/register">Register here</Link>
      </OtherOption>
    </MainView>
  );
}
