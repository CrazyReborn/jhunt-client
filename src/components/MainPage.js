import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Applications from './Applications/Applications';
import Profile from './Profile';
import '../styles/MainPage.css';

export default function MainPage() {
  const [rerender, setRerender] = useState(false);
  return (
    <div className="mainContent">
      <Navbar rerender={rerender} setRerender={setRerender} />
      <div className="outlet">
        <Routes>
          <Route path="applications" element={<Applications rerender={rerender} setRerender={setRerender} />} />
          <Route path="/profile/*" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
