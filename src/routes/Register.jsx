import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material';

import { UserContext, UserUpdateContext } from '../context';

export function Register() {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  let setUser = useContext(UserUpdateContext);

  let { user } = useContext(UserContext);

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

  const handleSubmit = () => {
    console.log(state);
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/auth/register`, {
      method: 'post',
      body: JSON.stringify(state),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        console.log(data.jwt);
        window.localStorage.cf_data = JSON.stringify(data);
        setUser(data);
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
        <TextField id="registerName" label="Last Name" value={state.lastName} onChange={handleLname} />
        <TextField id="registerEmail" label="Email" value={state.email} onChange={handleMail} />
        <TextField id="registerPassword" label="Password" value={state.password} onChange={handlePassword} />
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </div>
  );
}
