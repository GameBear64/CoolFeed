import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Feed } from './routes/Feed';
import { Navbar } from './components/Navigation/index';
import { Post } from './routes/Post';

export default function App() {
  return (
    <div id="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post/:id" element={<Post />}>
          <Route path="edit" element={<Post />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Profile />} />
        <Route path="/settings" element={<Profile />} />
      </Routes>
    </div>
  );
}

function Profile() {
  return <h2>Profile</h2>;
}
