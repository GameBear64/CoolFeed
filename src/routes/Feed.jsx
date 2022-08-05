import { useState, useEffect } from 'react';
import { PostComponent } from '../components/Post/index';
import { PostForm } from '../components/PostForm/index';

import fetchFeed from './../utils/fetchFeed';

export function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchFeed(setPosts);
  }, []);

  return (
    <div id="feed" style={{ backgroundColor: '#efefef', border: '1px solid #bcbcbc', borderBottom: 'none', borderTop: 'none', width: '60vw', margin: 'auto' }}>
      <PostForm setPosts={setPosts} />
      {posts && posts.map(post => <PostComponent key={post._id} post={post} setPosts={setPosts} />)}
      <br />
    </div>
  );
}
