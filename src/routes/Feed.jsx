import { useState, useEffect } from 'react';
import { Post } from '../components/Post/index';
import { PostForm } from '../components/PostForm/index';

export function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/post`, {
      headers: {
        jwt: window.localStorage.getItem('jwt'),
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div id="feed" style={{ backgroundColor: 'lightgray' }}>
      <PostForm setPosts={setPosts} />
      {posts && posts.map(post => <Post key={post._id} post={post} />)}
      <br />
    </div>
  );
}
