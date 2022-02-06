import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ApplicationsLogo } from '../images/description_black_24dp.svg';
import { ReactComponent as ProfileLogo } from '../images/manage_accounts_black_24dp.svg';
import { ReactComponent as LogoutLogo } from '../images/logout_black_24dp.svg';
import '../styles/Navbar.css';
import NewApplicationForm from './Applications/NewApplicationForm';

export default function Navbar() {
  const [creatingNew, setCreatingNew] = useState(false);
  return (
    <>
      <nav>
        <button type="button" className="btn-action" onClick={() => setCreatingNew(true)}>Add New Application</button>
        <ul>
          <li>
            <NavLink to="/dashboard/applications">
              <ApplicationsLogo fill="white" />
              Applications
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <ProfileLogo fill="white" />
              Profille
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout">
              <LogoutLogo fill="white" />
              Log Out
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewApplicationForm creatingNew={creatingNew} setCreatingNew={setCreatingNew} />
    </>
  );
}
