/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import LoadingSpinner from '../LoadingSpinner';

export default function InterviewUpdateForm(props) {
  const {
    interview,
    setUpdating,
    setErrors,
  } = props;
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [date, setDate] = useState(format(parseISO(interview.date), 'yyyy-MM-dd'));
  const [application, setApplication] = useState(interview.application);
  const [length, setLength] = useState(interview.length);
  const [status, setStatus] = useState(interview.status);
  const [rate, setRate] = useState(interview.rate);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}applications`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json())
      .then((json) => {
        if (typeof json.err !== 'undefined') {
          setLoaded(true);
        } else {
          setApplications(json.applications);
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_SERVER}interviews/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        application,
        length,
        status,
        rate,
      }),
    }).then((res) => res.json())
      .then((json) => {
        if (typeof json.err === 'undefined') {
          setUpdating(false);
        } else {
          console.log(json.err);
        }
      })
      .catch((err) => {
        setErrors(err);
        console.log(err);
      });
  };

  return (
    loaded
      ? (
        <form className="newInterviewForm" onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="date">
            {'Set a date: '}
            <input type="date" id="date" name="date" defaultValue={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label htmlFor="application">
            {'Select application: '}
            <select
              id="application"
              defaultValue={interview.application._id}
              onChange={(e) => {
                setApplication(e.target.value);
              }}
            >
              <option value={null}>--Please select an option</option>
              {applications.map((applicationEntry) => (
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
            <input type="number" id="length" defaultValue={length} onChange={(e) => setLength(e.target.value)} />
          </label>
          <label htmlFor="status">
            {'Set status: '}
            <select id="status" defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
              <option value={null}>--Please select an option</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Finished">Finished</option>
            </select>
          </label>
          <label htmlFor="rating">
            {'Rate the inteviews (if finished) '}
            <input type="number" id="rating" defaultValue={rate} onChange={(e) => setRate(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      )
      : <LoadingSpinner />
  );
}
