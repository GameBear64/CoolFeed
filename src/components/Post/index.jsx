import { Fade } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { PostImage, PostBody, Post } from './styles';

import { PostComponentMeta } from './Meta/index';
import { PostComponentAction } from './Action/index';

export function PostComponent({ setPosts, post, single, searched }) {
  let { body, images } = post;

  return (
    <Fade in timeout={500}>
      <Post id="post">
        <PostComponentMeta setPosts={setPosts} post={post} single={single} />

        <PostBody>{body}</PostBody>

        <Carousel showThumbs={false} infiniteLoop emulateTouch useKeyboardArrows dynamicHeight showStatus={false} showIndicators={images?.length > 1}>
          {images && images.map(({ _id, name, data }) => <PostImage key={_id} src={data} alt={name} />)}
        </Carousel>

        {!searched && <PostComponentAction post={post} />}
        {searched && <br />}
      </Post>
    </Fade>
  );
}
