import logo from './logo.svg';
import './App.css';
import { Button, Icon } from '@mui/material';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #00ff00;
`;
const StyledButton = styled(Button)`
  && {
    background-color: #006600;
    border-radius: 0;
  }
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Title>Hello World!</Title>
        <p>
          Edit <code>src/App.js</code> and save to reload. <br /> Test file, just making sure everything works.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <br />
        <Button variant="contained">
          <Icon>favorite</Icon> Test button - very cool
        </Button>
        <br />
        <StyledButton variant="contained">
          <Icon>star</Icon> Styled button - even cooler
        </StyledButton>
      </header>
    </div>
  );
}

export default App;
