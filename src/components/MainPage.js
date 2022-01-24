import { Route, Routes } from "react-router-dom";
import Navbar from './Navbar';
import Applications from './Applications';
import Events from "./Events";
import Profile from "./Profile";

export default function MainPage () {
  return (
    <div className="mainContent">
      <Navbar />
      <Routes>
        <Route path='/applications' element={<Applications />} />
        <Route path='/events' element={<Events />} />
        <Route path='/profile' element={<Profile />} />
        </Routes>
    </div>
  )
}