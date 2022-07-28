import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './routes/home';
import { Navbar } from './routes/navigation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />}>
            <Route path="new" />
            <Route path="edit/:post" />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Profile() {
  return <h2>Profile</h2>;
}
