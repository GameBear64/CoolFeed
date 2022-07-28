import { Post } from '../components/Post/Post';

export function Feed() {
  let posts = [1, 2, 3];
  return (
    <div id="feed" style={{ backgroundColor: 'lightgray' }}>
      {posts.map(post => (
        <>
          <Post />
          <br />
        </>
      ))}
      <br />
    </div>
  );
}
