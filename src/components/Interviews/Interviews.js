import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InterviewGeneral from './InterviewGeneral';
import LoadingSpinner from '../LoadingSpinner';

export default function Interviews() {
  const [loaded, setLoaded] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();
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

  const onClickAddNew = () => {
    navigate('/dashboard/interviews/new');
  };

  return (
    !loaded
      ? <LoadingSpinner />
      : (
        <>
          <button type="button" className="btn-action" onClick={() => onClickAddNew()}>
            Add New Application
          </button>
          {interviews.map((interview) => <InterviewGeneral interview={interview} />)}
        </>
      )
  );
}
