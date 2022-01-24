import LandingPage from "./components/LandingPage";
import { Routes, Route} from 'react-router-dom';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import MainPage from "./components/MainPage";
import Events from "./components/Events";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/dashboard/*' element={<MainPage />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
    </Routes>
  );
}

export default App;
