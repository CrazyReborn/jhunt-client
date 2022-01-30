/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

export default function InterviewDetailed() {
  const [interview, setInterview] = useState();
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}interviews/${id}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json())
      .then((json) => {
        if (typeof json.interview === 'undefined') {
          setErrors(json.err);
          setLoaded(true);
        } else {
          setInterview(json.interview);
          setLoaded(true);
        }
      })
      .catch((err) => setErrors(err));
  }, []);

  return (
    loaded
      ? (
        <div className="interviewDetailed">
          <h3>
            {'Interview at '}
            {interview.application.company_name}
            {' on '}
            {interview.date}
          </h3>
          <p>{typeof interview.status !== 'undefined' ? interview.status : ''}</p>
          {interview.status === 'Finished'
            ? (
              <>
                <p>{interview.length}</p>
                <p>{interview.rate}</p>
              </>
            )
            : ''}
        </div>
      )
      : <LoadingSpinner />
  );
}
