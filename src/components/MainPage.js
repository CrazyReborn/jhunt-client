import { Route, Routes } from "react-router-dom";
import Navbar from './Navbar';
import Applications from './Applications';
import Events from "./Events";
import Profile from "./Profile";
import '../styles/MainPage.css';

export default function MainPage () {
  return (
    <div className="mainContent">
      <Navbar />
      <div className="outlet">
        <Routes>
          <Route path='/applications' element={<Applications />} />
          <Route path='/events' element={<Events />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        </div>
    </div>
  )
}