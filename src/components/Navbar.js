import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ApplicationsLogo } from '../images/description_black_24dp.svg';
import { ReactComponent as InterviewsLogo } from '../images/question_answer_black_24dp.svg';
import { ReactComponent as ProfileLogo } from '../images/manage_accounts_black_24dp.svg';
import { ReactComponent as LogoutLogo } from '../images/logout_black_24dp.svg';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/dashboard/applications">
            <ApplicationsLogo fill="white" />
            Applications
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/interviews">
            <InterviewsLogo fill="white" />
            Interviews
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
  );
}
