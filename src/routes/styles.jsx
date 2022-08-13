import styled from 'styled-components';
import { TextValidator } from 'react-material-ui-form-validator';

const MainView = styled.div`
  width: 30vw;
  min-width: 30em;
  margin: auto;
`;

const SideView = styled.div`
  position: absolute;
  left: 0;
  width: 30vw;
  padding: 4em 1em;
`;

const ProfilePicture = styled.img`
  width: auto;
  height: 3.5em;
  padding: 0px 10px;
  border-radius: 50%;
`;

const FullWidthInput = styled(TextValidator)`
  width: 95%;
  && {
    margin: 0.5em;
  }
`;

const HalfWidthInput = styled(TextValidator)`
  width: 46%;
  && {
    margin: 0.5em;
  }
`;

const Title = styled.h1`
  margin: 4em 0;
  text-align: center;
`;

const OtherOption = styled.p`
  margin: 3em 0;
  text-align: center;
  a {
    color: #3daeff;
    text-decoration: none;
  }
`;

export { MainView, SideView, ProfilePicture, FullWidthInput, HalfWidthInput, Title, OtherOption };
