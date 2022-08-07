export default async function fetchFeed(setPosts, page) {
  return fetch(`${window.location.protocol}//${window.location.hostname}:3030/post/page/${page}`, {
    headers: {
      jwt: JSON.parse(window.localStorage.getItem('cf_data')).jwt,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      if (page === 0) {
        // console.log('returned posts', data);
        setPosts(data);
      } else {
        setPosts(prev => {
          let p = prev.posts.concat(data.posts);
          return { posts: p, count: data.count };
        });
      }
    });
}
