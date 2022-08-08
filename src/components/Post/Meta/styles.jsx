import styled from 'styled-components';

import { Grid } from '@mui/material';

const ProfilePicture = styled.img`
  width: auto;
  height: 3.5em;
  padding: 0px 10px;
  border-radius: 50%;
`;

const MetaTab = styled(Grid)`
  margin: 10px 0;
`;

export { ProfilePicture, MetaTab };
