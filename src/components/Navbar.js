import { Link } from "react-router-dom";

export default function Navbar () {
  return (
    <nav>
      <ul>
        <li><Link to='/dashboard/applications'>Applications</Link></li>
        <li><Link to='/dashboard/events'>Events</Link></li>
        <li><Link to='/dashboard/profile'>Profille</Link></li>
        <li><Link to='/logout'>Log Out</Link></li>
      </ul>
    </nav>
  )
}