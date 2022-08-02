export default async function fetchFeed(setPosts) {
  return fetch(`${window.location.protocol}//${window.location.hostname}:3030/post`, {
    headers: {
      jwt: window.localStorage.getItem('jwt'),
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => setPosts(data));
}
