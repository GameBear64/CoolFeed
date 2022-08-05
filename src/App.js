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

export default function App() {
  return (
    <div id="app">
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RouteGuardian />}>
            <Route path="/" element={<Feed />} />
            <Route path="/post/:id" element={<Post />}>
              <Route path="edit" element={<Post />} />
            </Route>
            <Route path="/profile" element={<Profile />}>
              <Route path="settings" element={<Profile />} />
            </Route>
            <Route path="/search" element={<Profile />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

function Profile() {
  return <h2>Profile</h2>;
}
