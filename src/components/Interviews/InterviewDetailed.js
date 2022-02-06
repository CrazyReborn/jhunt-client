/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import InterviewUpdateForm from './InterviewUpdateForm';

export default function InterviewDetailed() {
  const [interview, setInterview] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [updating, setUpdating] = useState(false);

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
  }, [id]);

  const DeleteInterview = () => {
    fetch(`${process.env.REACT_APP_API_SERVER}interviews/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => res.json())
      .then((json) => {
        if (typeof json.err !== 'undefined') {
          console.log(json.err);
        } else {
          navigate('/dashboard/interviews');
        }
      });
  };
  if (!updating) {
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
            <button type="button" onClick={() => setUpdating(true)}>Update</button>
            <button type="button" onClick={() => DeleteInterview()}>Delete</button>
          </div>
        )
        : <LoadingSpinner />
    );
  } return (
    <InterviewUpdateForm
      interview={interview}
      setUpdating={setUpdating}
      setErrors={setErrors}
    />
  );
}
