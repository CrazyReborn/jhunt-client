import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import '../../styles/NewInterviewForm.css';

export default function NewInterviewForm() {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState();
  const [length, setLength] = useState('');
  const [status, setStatus] = useState('');
  const [rate, setRate] = useState('');
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}applications`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json())
      .then((json) => {
        if (json.applications === undefined) {
          setErrors(json.err.errors);
          setLoaded(true);
        } else {
          setApplications(json.applications);
          setLoaded(true);
        }
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_SERVER}interviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date,
        application: selectedApplication,
        length,
        status,
        rate,
      }),
    }).then((res) => res.json())
      .then((json) => {
        if (json.msg === 'success') {
          navigate('/dashboard/interviews');
        } else {
          setErrors(json.err.errors);
        }
      });
  };

  return (
    loaded
      ? (
        <form className="newInterviewForm" onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="date">
            {'Set a date: '}
            <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label htmlFor="application">
            {'Select application: '}
            <select
              id="application"
              onChange={(e) => {
                setSelectedApplication(e.target.value);
              }}
            >
              <option value={null}>--Please select an option</option>
              {applications.sort().map((applicationEntry) => (
                <option
                  key={applicationEntry._id}
                  value={applicationEntry._id}
                >
                  {`at ${applicationEntry.company_name}`}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="length">
            {'Set interview length (if finished): '}
            <input type="number" id="length" onChange={(e) => setLength(e.target.value)} />
          </label>
          <label htmlFor="status">
            {'Set status: '}
            <select id="status" onChange={(e) => setStatus(e.target.value)}>
              <option value={null}>--Please select an option</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Finished">Finished</option>
            </select>
          </label>
          <label htmlFor="rating">
            {'Rate the inteviews (if finished) '}
            <input type="number" id="rating" onChange={(e) => setRate(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
          {errors.length > 0
            ? (
              <div className="errors">
                {errors.map((err) => <p key={err.param}>{err.msg}</p>)}
              </div>
            )
            : ''}
        </form>
      )
      : <LoadingSpinner />
  );
}
