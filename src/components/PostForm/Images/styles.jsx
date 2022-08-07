import styled from 'styled-components';

const ImageIndicator = styled.p`
  width: 50%;
  margin: auto;
  border: 1px solid #adadad;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    vertical-align: -0.2em;
    color: #e70000;
    float: right;
  }
`;

export { ImageIndicator };
