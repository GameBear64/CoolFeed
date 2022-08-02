import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material';

export function Register() {
  const [state, setState] = useState({
    firstName: '',
    email: '',
    password: '',
  });

  const handleFname = event => {
    setState(s => ({ ...s, firstName: event.target.value }));
  };

  const handleMail = event => {
    setState(s => ({ ...s, email: event.target.value }));
  };

  const handlePassword = event => {
    setState(s => ({ ...s, password: event.target.value }));
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(state);
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/auth/register`, {
      method: 'post',
      body: JSON.stringify(state),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        if (!window.localStorage.jwt) return;
        window.localStorage.jwt = data.jwt;
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
        <TextField id="registerName" label="First Name" value={state.firstName} onChange={handleFname} />
        <TextField id="registerEmail" label="Email" value={state.email} onChange={handleMail} />
        <TextField id="registerPassword" label="Password" value={state.password} onChange={handlePassword} />
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </div>
  );
}
