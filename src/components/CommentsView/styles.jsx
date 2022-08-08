import styled from 'styled-components';

import Twemoji from 'react-twemoji';

const CommentImage = styled.img`
  width: auto;
  height: 3.5em;
  padding: 0px 10px;
  border-radius: 50%;
`;

const CommentBody = styled(Twemoji)`
  padding: 1em 2em;
`;

const Comment = styled.div`
  background-color: #e6e6e6;
  border: 1px solid #dbdbdb;
  padding: 0.5em 0 0 0;
  margin: 2em 0;
`;

export { CommentImage, CommentBody, Comment };
