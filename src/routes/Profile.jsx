import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { MainView } from './styles';
import { UserContext } from '../context';

import { PostComponent } from '../components/Post/index';

export function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  let { user, jwt } = useContext(UserContext);

  const [posts, setPosts] = useState({
    posts: [],
    count: 0,
  });

  const [page, setPage] = useState(0);

  const fetchMoreData = () => {
    console.log('at fetch more', profile);
    if (profile === null) return;
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/byuser/${profile._id}/${page}`, {
      headers: {
        jwt: JSON.parse(window.localStorage.getItem('cf_data')).jwt,
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (page === 0) {
          setPosts(data);
        } else {
          setPosts(prev => {
            let p = prev.posts.concat(data.posts);
            return { posts: p, count: data.count };
          });
        }
      });
    setPage(p => p + 1);
    console.log('page', page);
    console.log('posts', posts);
  };

  useEffect(() => {
    fetchMoreData();
  }, [profile]);

  useEffect(() => {
    if (id) {
      fetch(`${window.location.protocol}//${window.location.hostname}:3030/user/${id}`, {
        headers: {
          jwt,
          'content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => setProfile(data));
    } else {
      fetch(`${window.location.protocol}//${window.location.hostname}:3030/user/${user._id}`, {
        headers: {
          jwt,
          'content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => setProfile(data));
    }

    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, jwt, user]);

  return (
    <MainView id="profile">
      <h1>
        {profile?.firstName} {profile?.lastName}
      </h1>
      {profile?.nickname && <p>aka {profile.nickname}</p>}

      {console.log(profile)}

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
    </MainView>
  );
}
