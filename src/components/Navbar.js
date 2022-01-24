import { NavLink } from "react-router-dom";

export default function Navbar () {
  return (
    <nav>
      <ul>
        <li><NavLink to='/dashboard/applications' >Applications</NavLink></li>
        <li><NavLink to='/dashboard/events'>Events</NavLink></li>
        <li><NavLink to='/dashboard/profile'>Profille</NavLink></li>
        <li><NavLink to='/logout'>Log Out</NavLink></li>
      </ul>
    </nav>
  )
}