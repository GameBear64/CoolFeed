/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';

import { MainView } from './styles';
import { SearchStateContext, UserContext } from '../context';

import { PostComponent } from '../components/Post/index';
import { UserCard } from '../components/UserCard/index';

export function Search() {
  let { jwt } = useContext(UserContext);
  let searchState = useContext(SearchStateContext);

  const [search, setSearch] = searchState;

  let [result, setResult] = useState([]);
  let [searchType, setSearchType] = useState('posts');

  const toggleSearchType = () => {
    setResult([]);
    setSearchType(p => (p === 'posts' ? 'users' : 'posts'));
  };

  useEffect(() => {
    if (!search) return;

    updateResults();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, jwt, searchType]);

  const updateResults = () => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3030/search/${searchType}/${search}`, {
      headers: {
        jwt,
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setResult(data));
  };

  return (
    <MainView id="profile">
      <h1>Search {searchType}</h1>
      <Button onClick={toggleSearchType}>Toggle Search type</Button>
      {result.length === 0 && search && <p>No results for {search}</p>}
      {result.length > 0 && search && <p>Results for {search}</p>}
      {result.length > 0 && searchType === 'users' && result.map(user => <UserCard key={user._id} profile={user} getUser={updateResults} />)}
      {result.length > 0 && searchType === 'posts' && result.map(post => <PostComponent key={post._id} post={post} searched />)}
    </MainView>
  );
}
