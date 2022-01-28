import React, { useEffect, useState } from 'react';
import InterviewGeneral from './InterviewGeneral';
import LoadingSpinner from '../LoadingSpinner';

export default function Interviews() {
  const [loaded, setLoaded] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [, setErrors] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}interviews`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json())
      .then((json) => {
        if (typeof json.err !== 'undefined') {
          setErrors(json.err.errors);
        } else {
          setInterviews(json.interviews);
          setLoaded(true);
        }
      })
      .catch((err) => setErrors(err));
  }, [loaded]);

  return (
    !loaded
      ? <LoadingSpinner />
      : interviews.map((interview) => <InterviewGeneral interview={interview} />)
  );
}
