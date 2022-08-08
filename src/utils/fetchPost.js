export default async function fetchFeed(setPost, postId) {
  if (!postId) return;
  return fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/${postId}`, {
    headers: {
      jwt: JSON.parse(window.localStorage.getItem('cf_data')).jwt,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => setPost(data));
}
