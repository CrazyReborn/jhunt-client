import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Applications from './Applications';
import Events from './Events';
import Profile from './Profile';
import '../styles/MainPage.css';
import ApplicationDetailed from './ApplicatoinDetailed';
import NewApplicationForm from './NewApplicationForm';

export default function MainPage() {
  return (
    <div className="mainContent">
      <Navbar />
      <div className="outlet">
        <Routes>
          <Route path="/applications/*" element={<Applications />} />
          <Route path="/applications/:id" element={<ApplicationDetailed />} />
          <Route path="/applications/new" element={<NewApplicationForm />} />
          <Route path="/events/*" element={<Events />} />
          <Route path="/profile/*" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
