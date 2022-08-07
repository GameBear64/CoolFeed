import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import { UserContextProvider } from './context/index';
import RouteGuardian from './components/RouteGuardian/index';

import { Feed } from './routes/Feed';
import { Navbar } from './components/Navigation/index';
import { Post } from './routes/Post';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { Profile } from './routes/Profile';
import { Friends } from './routes/Friends';

export default function App() {
  return (
    <div id="app">
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* all mighty guardian starts here */}
          <Route element={<RouteGuardian />}>
            <Route path="/" element={<Feed />} />
            <Route path="/post/:id" element={<Post />}>
              <Route path="edit" element={<Post />} />
            </Route>
            <Route path="/profile" element={<Profile />}>
              <Route path=":id" element={<Profile />} />
              <Route path="settings" element={<Profile />} />
              <Route path="friends" element={<Friends />} />
            </Route>
            <Route path="/search" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

function PageNotFound() {
  return <h2>404 not found</h2>;
}
