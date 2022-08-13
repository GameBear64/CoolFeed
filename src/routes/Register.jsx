import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { ValidatorForm } from 'react-material-ui-form-validator';

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
  const handleConfirmPassword = event => {
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

  ValidatorForm.addValidationRule('isName', value => {
    return value.length >= 3 && value.length <= 15;
  });

  ValidatorForm.addValidationRule('isPasswordMatch', value => {
    return value === state.password;
  });

  ValidatorForm.addValidationRule('password', value => {
    return value.length >= 8;
  });

  return (
    <MainView id="login">
      <Title>Create your CoolFeed Account</Title>
      <ValidatorForm onSubmit={handleSubmit}>
        <FullWidthInput id="registerName" label="First Name" name="firstName" value={state.firstName} onChange={handleFname} validators={['required', 'isName']} errorMessages={['This field is required', 'Must between 3 and 15 characters']} />

        <FullWidthInput id="registerName" label="Last Name" value={state.lastName} onChange={handleLname} validators={['required', 'isName']} errorMessages={['This field is required', 'Must between 3 and 15 characters']} />

        <FullWidthInput id="registerEmail" label="Email" value={state.email} onChange={handleMail} validators={['required', 'isEmail']} errorMessages={['This field is required', 'Invalid email']} />

        <FullWidthInput id="registerPassword" label="Password" value={state.password} onChange={handlePassword} validators={['required', 'password']} type="password" errorMessages={['This field is required', 'Must be at least 8 characters']} />

        <FullWidthInput id="registerPasswordConfirm" label="Confirm Password" value={state.confirmPassword} onChange={handleConfirmPassword} type="password" validators={['required', 'isPasswordMatch']} errorMessages={['This field is required', 'Passwords must match']} />

        <Box textAlign="center" style={{ margin: '1em' }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </ValidatorForm>
      <OtherOption>
        Already have an account? <Link to="/login">Log in</Link>
      </OtherOption>
    </MainView>
  );
}
