import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { PostComponent } from '../components/Post/index';
import { PostForm } from '../components/PostForm/index';

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const location = useLocation();
  const editMode = location.pathname.includes('/edit') || false;

  useEffect(() => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/${id}`, {
      headers: {
        jwt: window.localStorage.getItem('jwt'),
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  return (
    <div id="singlePost" style={{ backgroundColor: 'lightgray' }}>
      {/* have these two components have modes, single post and multi post */}
      {/* post form will be empty in multipost and prepopulated in single post */}
      {/* post component wont have the "view" option in single post mode */}
      {(editMode && <PostForm setPosts={setPost} />) || <PostComponent post={post} setPosts={setPost} />}
    </div>
  );
}
