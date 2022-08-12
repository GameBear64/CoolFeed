import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid } from '@mui/material';
import Twemoji from 'react-twemoji';

import { MainView, SideView, ProfilePicture } from './styles';
import { UserContext } from '../context';

import { PostComponent } from '../components/Post/index';
import { FriendButton } from './../components/FriendButton/index';
import { UserCard } from '../components/UserCard/index';

export function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  let { user, jwt } = useContext(UserContext);

  const defaultPostState = { posts: [], count: 0 };
  const [posts, setPosts] = useState(defaultPostState);

  const [page, setPage] = useState(0);

  const fetchMoreData = () => {
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
  };

  useEffect(() => {
    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const getUser = () => {
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
  };

  useEffect(() => {
    setPosts(defaultPostState);
    setPage(0);
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, jwt, user]);

  return (
    <>
      <SideView>
        <h2>Friends of {profile?.nickname || profile?.firstName}</h2>
        {profile?.friends && profile.friends.map(friend => <UserCard key={friend._id} profile={friend} />)}
      </SideView>
      <MainView id="profile">
        <Grid
          item
          xs={10}
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '1em',
          }}
        >
          <ProfilePicture src={profile?.profilePicture} alt="ProfilePicture" />
          <div>
            <h1>
              {profile?.firstName} {profile?.lastName}
            </h1>
            <h3>{profile?.nickname && <p>aka {profile.nickname}</p>}</h3>

            <FriendButton profile={profile} getUser={getUser} />
          </div>
        </Grid>

        <Twemoji>{profile?.biography && <p>{profile.biography}</p>}</Twemoji>

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
    </>
  );
}
