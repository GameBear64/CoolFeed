import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { PostComponent } from '../components/Post/index';
import { PostForm } from '../components/PostForm/index';

import fetchFeed from './../utils/fetchFeed';

import { MainView } from './styles';

export function Feed() {
  const [posts, setPosts] = useState({
    posts: [],
    count: 0,
  });

  const [page, setPage] = useState(0);

  const fetchMoreData = () => {
    fetchFeed(setPosts, page);
    setPage(p => p + 1);
    console.log('page', page);
    console.log('posts', posts);
  };

  useEffect(() => {
    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainView>
      <PostForm setPosts={setPosts} />

      {posts.posts && (
        <InfiniteScroll
          dataLength={posts?.posts?.length}
          next={fetchMoreData}
          hasMore={posts?.posts?.length < posts.count}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You reached the end!</b>
            </p>
          }
        >
          {posts.posts.map(post => (
            <PostComponent key={post._id} post={post} setPosts={setPosts} />
          ))}
        </InfiniteScroll>
      )}

      <br />
    </MainView>
  );
}
