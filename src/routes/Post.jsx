import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { PostComponent } from '../components/Post/index';
import { PostForm } from '../components/PostForm/index';

import { MainView } from './styles';

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const location = useLocation();
  const editMode = location.pathname.includes('/edit') || false;

  useEffect(() => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/${id}`, {
      headers: {
        jwt: JSON.parse(window.localStorage.getItem('cf_data')).jwt,
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  return <MainView id="singlePost">{post && ((editMode && <PostForm setPosts={setPost} post={post} />) || <PostComponent post={post} setPosts={setPost} single />)}</MainView>;
}
