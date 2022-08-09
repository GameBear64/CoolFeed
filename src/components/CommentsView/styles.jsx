import styled from 'styled-components';

const CommentImage = styled.img`
  width: auto;
  height: 2.5em;
  padding: 0px 10px;
  border-radius: 50%;
`;

const CommentTimestamp = styled.p`
  padding: 0.1em 0 0 0.4em;
  vertical-align: center;
`;

const Comment = styled.div`
  background-color: #e6e6e6;
  border: 1px solid #dbdbdb;
  border-radius: 0.5em;
  padding: 1em 0;
  margin: 1em 0;
`;

export { CommentImage, CommentTimestamp, Comment };
