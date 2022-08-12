import styled from 'styled-components';

import Twemoji from 'react-twemoji';

const PostImage = styled.img`
  padding: 0 2em;
  object-fit: contain;
  max-width: 100%;
  max-height: 60vh;
  width: auto;
  height: auto;
`;

const PostBody = styled(Twemoji)`
  white-space: pre-wrap;
  padding: 1em 2em;
`;

const Post = styled.div`
  background-color: #d0d0d0;
  border: 1px solid #bcbcbc;
  border-radius: 0.5em;
  margin: 2em 0;
`;

export { PostImage, PostBody, Post };
