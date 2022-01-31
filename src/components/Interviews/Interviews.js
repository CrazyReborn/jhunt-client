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

  const upcoming = interviews.filter((interview) => interview.status === 'Upcoming');
  const finished = interviews.filter((interview) => interview.status === 'Finished');

  return (
    !loaded
      ? <LoadingSpinner />
      : (
        <>
          <button type="button" className="btn-action" onClick={() => onClickAddNew()}>
            Add New Application
          </button>
          <div className="upcomingInterviews">
            Upcoming:
            {upcoming.map((interview) => (
              <InterviewGeneral
                key={interview._id}
                interview={interview}
              />
            ))}
          </div>
          <div className="finishedInterviews">
            Finished:
            {finished.map((interview) => (
              <InterviewGeneral
                key={interview._id}
                interview={interview}
              />
            ))}
          </div>
        </>
      )
  );
}
