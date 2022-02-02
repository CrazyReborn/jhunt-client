import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Applications from './Applications/Applications';
import Profile from './Profile';
import '../styles/MainPage.css';
import ApplicationDetailed from './Applications/ApplicationDetailed';
import NewApplicationForm from './Applications/NewApplicationForm';
import Interviews from './Interviews/Interviews';
import NewInterviewForm from './Interviews/NewInterviewForm';
import InterviewDetailed from './Interviews/InterviewDetailed';

export default function MainPage() {
  return (
    <div className="mainContent">
      <Navbar />
      <div className="outlet">
        <Routes>
          <Route path="applications" element={<Applications />} />
          <Route path="applications/:id" element={<ApplicationDetailed />} />
          <Route path="applications/new" element={<NewApplicationForm />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="interviews/:id" element={<InterviewDetailed />} />
          <Route path="interviews/new" element={<NewInterviewForm />} />
          <Route path="/profile/*" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
