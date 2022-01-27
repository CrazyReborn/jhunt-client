import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationGeneral from './ApplicationGeneral';
import LoadingSpinner from '../LoadingSpinner';

export default function Applications() {
  const [applications, setApplicatoins] = useState([]);
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
        } else {
          setApplicatoins(json.applications);
          setLoaded(true);
        }
      })
      .catch((err) => setErrors(['There was an error while fetching data: ', err]));
  }, [errors]);

  const onClickAddNew = () => {
    navigate('/dashboard/applications/new');
  };

  return (
    loaded
      ? (
        <>
          <button type="button" className="btn-action" onClick={() => onClickAddNew()}>Add New Application</button>
          {applications.map((application) => (
            <ApplicationGeneral
              key={application._id}
              application={application}
            />
          ))}
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
