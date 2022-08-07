import styled from 'styled-components';

import { Button } from '@mui/material';

const SubmitButton = styled(Button)`
  float: right;
`;

const EmoteButton = styled(Button)`
  && img {
    height: 1.7em;
    padding: 0 0.5em;
    vertical-align: -0.4em;
  }
`;

export { SubmitButton, EmoteButton };
