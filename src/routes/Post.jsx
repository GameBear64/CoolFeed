import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { PostComponent } from '../components/Post/index';
import { PostForm } from '../components/PostForm/index';
import { PostComments } from '../components/CommentsView/index';

import fetchPost from './../utils/fetchPost';

import { MainView } from './styles';

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const location = useLocation();
  const editMode = location.pathname.includes('/edit') || false;

  useEffect(() => {
    fetchPost(setPost, id);
  }, [id]);

  return (
    <MainView id="singlePost">
      {post && ((editMode && <PostForm setPosts={setPost} post={post} />) || <PostComponent post={post} setPosts={setPost} single />)}
      {post && <PostComments setPosts={setPost} post={post} />}
    </MainView>
  );
}
