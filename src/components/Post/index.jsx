import Twemoji from 'react-twemoji';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { PostComponentMeta } from './Meta/index';
import { PostComponentAction } from './Action/index';

export function PostComponent({ setPosts, post }) {
  let { body, images } = post;

  return (
    <div id="post" style={{ backgroundColor: '#d0d0d0', border: '1px solid #bcbcbc', borderLeft: 'none', borderRight: 'none', marginBottom: '5vh' }}>
      <PostComponentMeta setPosts={setPosts} post={post} />

      <Twemoji>
        <p id="post">{body}</p>
      </Twemoji>

      <Carousel showThumbs={false} infiniteLoop emulateTouch useKeyboardArrows>
        {images && images.map(({ _id, name, data }) => <img key={_id} src={data} alt={name} />)}
      </Carousel>

      <PostComponentAction post={post} />
    </div>
  );
}
