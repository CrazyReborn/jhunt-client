import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState([]);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_SERVER + 'signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(json => {
        if (typeof json.err !== 'undefined') {
          setError(json.err.errors)
        } else {
          navigate('/dashboard/applications');
        }
      })
  }
  return (
    <div className="sign-up">
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <label htmlFor="password">Password</label>
        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <p>Don't have an account yet? <Link to='/signup'>Sign Up</Link></p>
        <input className="btn-action" type='submit' value='Sign In'></input>
      </form>
      {errors !== [] ? 
      <div className="errors">
      {errors.map((err) => {
        return (
          <p key={err.param}>{err.msg}</p>
        )
      })}
    </div>
    : <></>
      }
    </div>
  )
}