import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { PostImage, PostBody, Post } from './styles';

import { PostComponentMeta } from './Meta/index';
import { PostComponentAction } from './Action/index';

export function PostComponent({ setPosts, post, single }) {
  let { body, images } = post;

  return (
    <Post id="post">
      <PostComponentMeta setPosts={setPosts} post={post} single={single} />

      <PostBody>
        <p>{body}</p>
      </PostBody>

      <Carousel showThumbs={false} infiniteLoop emulateTouch useKeyboardArrows dynamicHeight showStatus={false} showIndicators={images?.length > 1}>
        {images && images.map(({ _id, name, data }) => <PostImage key={_id} src={data} alt={name} />)}
      </Carousel>

      <PostComponentAction post={post} />
    </Post>
  );
}
