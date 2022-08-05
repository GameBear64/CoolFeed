import { useState, useEffect } from 'react';
import { PostComponent } from '../components/Post/index';
import { PostForm } from '../components/PostForm/index';

import fetchFeed from './../utils/fetchFeed';

import { MainView } from './styles';

export function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchFeed(setPosts);
  }, []);

  return (
    <MainView>
      <PostForm setPosts={setPosts} />

      {posts && posts.map(post => <PostComponent key={post._id} post={post} setPosts={setPosts} />)}

      <p style={{ textAlign: 'center' }}>You reached the end!</p>
      <br />
    </MainView>
  );
}
