import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material';

import { UserUpdateContext } from '../context';

export function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  let setUser = useContext(UserUpdateContext);

  const handleMail = event => {
    setState(s => ({ ...s, email: event.target.value }));
  };

  const handlePassword = event => {
    setState(s => ({ ...s, password: event.target.value }));
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(state);
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/auth/login`, {
      method: 'post',
      body: JSON.stringify(state),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(async data => {
        window.localStorage.jwt = data.jwt;
        setUser(data.jwt);
        navigate('/');
      });
  };

  return (
    <div id="login" style={{ backgroundColor: 'lightgray' }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="loginEmail" label="Email" value={state.email} onChange={handleMail} />
        <TextField id="loginPassword" label="Password" value={state.password} onChange={handlePassword} />
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </div>
  );
}
