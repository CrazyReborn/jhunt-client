import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationGeneral from './ApplicationGeneral';
import LoadingSpinner from '../LoadingSpinner';
import '../../styles/Applications.css';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}applications`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.applications === undefined) {
          setErrors(json.err.errors);
          setLoaded(true);
        } else {
          setApplications(json.applications);
          setLoaded(true);
        }
      })
      .catch((err) => {
        setErrors(['There was an error while fetching data: ', err]);
        setLoaded(true);
      });
  }, [errors]);

  const onClickAddNew = () => {
    navigate('/dashboard/applications/new');
  };

  return (
    loaded
      ? (
        <>
          <button type="button" className="btn-action" onClick={() => onClickAddNew()}>Add New Application</button>
          <div className="applications">
            {applications.map((application) => (
              <ApplicationGeneral
                key={application._id}
                application={application}
              />
            ))}
          </div>
          {errors !== []
            ? (
              <div className="errors">
                {errors.map((err) => <p key={err.param}>{err.msg}</p>)}
              </div>
            )
            : ''}
        </>
      )
      : <LoadingSpinner />
  );
}
