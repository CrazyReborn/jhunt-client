import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorPopUp from './Applications/ErrorPopUp';
import '../styles/SignUp.css';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState([]);
  const [gotErr, setGotErr] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_SERVER}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.err !== 'undefined') {
          setError(json.err.errors);
        } else {
          navigate('/dashboard/applications');
        }
        setGotErr(errors.length > 0);
      });
  };
  return (
    <div className="sign-up">
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="username">
          {'Username: '}
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label htmlFor="password">
          {'Password: '}
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <p>
          {'Don\'t have an account yet? '}
          <Link to="/signup">Sign Up</Link>
        </p>
        <input className="btn-action" type="submit" value="Sign In" />
      </form>
      <ErrorPopUp errors={errors} gotErr={gotErr} setGotErr={setGotErr} />
    </div>
  );
}
