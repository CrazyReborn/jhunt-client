import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setError] = useState([]);

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_SERVER}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, confirmPassword }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.err !== 'undefined') {
          setError(json.err.errors);
        } else {
          navigate('/');
        }
      });
  };

  return (
    <div className="sign-up">
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="username">
          Username
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label htmlFor="confirm-password">
          Confirm Password
          <input type="password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <p>
          Already have an account?
          <Link to="/signin">Log In</Link>
        </p>
        <input className="btn-action" type="submit" value="Sign Up" />
      </form>
      {errors !== []
        ? (
          <div className="errors">
            {errors.map((err) => <p key={err.param}>{err.msg}</p>)}
          </div>
        )
        : ''}
    </div>
  );
}
